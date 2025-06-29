import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {
  const { mood } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Suggest a popular YouTube song link for this mood: "${mood}"`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const urlMatch = text.match(/https?:\/\/[^\s]+/);

  if (urlMatch) {
    return NextResponse.json({ songUrl: urlMatch[0] });
  } else {
    return NextResponse.json({ error: "No song found" }, { status: 404 });
  }
}
