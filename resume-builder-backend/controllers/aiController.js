// import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import { log } from "console";

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
// const models = await genAI.listModels();
// console.log(genAI);

export const enhanceText = async (req, res) => {
  try {
    // console.log("========== AI REQUEST ==========");
    // console.log("Body:", req.body);
    // console.log("Section:", req.body.section);
    // console.log("Text:", req.body.text);

    const { section, text } = req.body;

    if (!section || !text) {
      return res.status(400).json({
        success: false,
        message: "Section and text are required",
      });
    }
    // const model = genAI.GoogleGenAI({
    //   model: "gemini-3.6-flash",
    // });

    const prompt = `
You are a professional resume writer.

Improve the following ${section}.

Rules:
- Keep it ATS friendly.
- Use professional English.
- Don't invent fake experience.
- Keep it between 30 and 50 words.
- Remove the extra words give only words which is used in my section 

Text:
${text}
`;

    // const result = await model.generateContent(prompt);
    const result = await genAI.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    // const enhanced = result.response.text();

    res.status(200).json({
      success: true,
      // enhanced,
      enhanced: result.text,
    });
  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
