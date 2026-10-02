import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(req: NextRequest) {
  try {
    const { prompt, systemInstruction, model = "gemini-3.5-flash" } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback for demo when key is not configured
      return NextResponse.json({
        text: `[Girmaic AI Studio Mock Response - Gemini API Key not configured]: Successfully processed prompt: "${prompt.slice(0, 60)}..."`,
      });
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: systemInstruction ? { systemInstruction } : undefined,
    });

    return NextResponse.json({ text: response.text || "No response generated." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate content from AI." },
      { status: 500 }
    );
  }
}
