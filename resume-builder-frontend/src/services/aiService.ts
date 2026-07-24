import { postJson } from "./api";

interface AIResponse {
  success: boolean;
  enhanced: string;
}

export const enhanceText = async (section: string, text: string) => {
  const response = await postJson<AIResponse>("/api/ai/enhance", {
    section,
    text,
  });

  return response.enhanced;
};
