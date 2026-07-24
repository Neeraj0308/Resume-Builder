import Resume from "../models/Resume.js";

import fs from "fs";
import pdf from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const importResume = async (req, res) => {
  try {
    const buffer = fs.readFileSync(req.file.path);

    const pdfData = await pdf(buffer);

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
Extract resume information.

Return ONLY valid JSON.

Schema:

{
 title:"",
 personalInfo:{
   full_name:"",
   email:"",
   phone:"",
   location:"",
   profession:"",
   linkedin:"",
   website:"",
   summary:""
 },
 professionalSummary:"",
 experience:[],
 education:[],
 projects:[],
 skills:[]
}

Resume:

${pdfData.text}
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
