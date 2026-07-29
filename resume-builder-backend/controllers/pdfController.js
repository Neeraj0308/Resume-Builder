import Resume from "../models/Resume.js";

import fs from "fs";
import pdf from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const importResume = async (req, res) => {
  try {
    const buffer = fs.readFileSync(req.file.path);

    const pdfData = await pdf(buffer);

    const cleanedText = pdfData.text
      .replace(/\r/g, "")
      .replace(/\n{2,}/g, "\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim();

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
You are an expert ATS resume parser.

Extract ALL information from this resume.

Return ONLY valid JSON.
Do not explain anything.
Do not wrap the JSON inside markdown.

Use this exact schema:

{
  "title":"",
  "personalInfo":{
    "full_name":"",
    "email":"",
    "phone":"",
    "location":"",
    "profession":"",
    "linkedin":"",
    "github":"",
    "website":"",
    "portfolio":"",
    "summary":""
  },
  "professionalSummary":"",
  "experience":[
    {
      "company":"",
      "position":"",
      "location":"",
      "startDate":"",
      "endDate":"",
      "currentlyWorking":false,
      "description":""
    }
  ],
  "education":[
    {
      "institution":"",
      "degree":"",
      "field":"",
      "startDate":"",
      "endDate":"",
      "cgpa":"",
      "percentage":""
    }
  ],
  "projects":[
    {
      "title":"",
      "description":"",
      "technologies":[],
      "github":"",
      "live":""
    }
  ],
  "skills":[],
  "certifications":[],
  "languages":[],
  "achievements":[],
  "interests":[]
}

Rules:

- If a field is missing, use "" or [].
- Never invent data.
- Extract every skill.
- Extract every project.
- Extract every education entry.
- Extract every work experience.
- Extract all links.
- Return valid JSON only.

Resume:

${cleanedText}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    text = text

      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const resume = JSON.parse(text);

    const savedResume = await Resume.create({
      user: req.user.id,
      title: resume.title || "Imported Resume",
      personalInfo: resume.personalInfo,
      professionalSummary: resume.professionalSummary,
      experience: resume.experience,
      education: resume.education,
      projects: resume.projects,
      skills: resume.skills,
      template: "classic",
      accentColor: "#2563EB",
      public: false,
    });

    return res.status(201).json({
      success: true,
      resume: savedResume,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
