import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generatePoem = async (topic: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `Write a short, incredibly romantic love poem (max 12 lines) in Japanese about: "${topic}". 
    The style should be modern yet timeless, emotional, and deep, similar to contemporary Japanese romance poetry or lyrics. 
    Use natural, emotive Japanese. Focus on imagery of nature, light, stars, and deep connection.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Minimize latency for this creative task
        temperature: 0.9, // Higher creativity
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text generated");
    }
    return text.trim();
  } catch (error) {
    console.error("Error generating poem:", error);
    throw error;
  }
};