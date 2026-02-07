import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: apiKey});

const AIService = {
    async explainWrongAnswer({question, userSelected, correctAnswer}) {
        const generationConfig = {
        temperature: 0.1
    }
    const prompt =`
        ROLE: 
        Your are a quiz tutor, your job is to help user learn from mistakes.

        TASK:
        Give a multiple choice or True / False question, the user's selected answer, and correct answer,\
        generate a concise explanation.

        RULES:
        - Output must be a valid JSON
        - Use ONLY the information provided in INPUT. Do not invent facts.
        - Keep each field <= 2 sentences.
        - If you are not sure about factual background, say "Not fully sure" and suggest verifying.
        - Do NOT include chain-of-thought or hidden reasoning.

        INPUT:
        question: ${question}
        user_selected: ${userSelected}
        correct_answer: ${correctAnswer}

        OUTPUT JSON SCHEMA:
        {"concept": string,
        "why_correct": string,
        "why_wrong": string,
        "tip": string,
        "confidence": "high" | "medium" | "low"
        }

        EXAMPLE:
        INPUT:
        question: What is 2+2?
        user_selected: 3
        correct_answer: 4

        OUTPUT:
        {"concept":"Basic arithmetic addition.","why_correct":"2+2 equals 4.","why_wrong":"Choosing 3 is a common off-by-one mistake.","tip":"Add step-by-step: 2+2=4.","confidence":"high"}
    `

    try{
        const analyzeResponse = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            generationConfig: generationConfig

        });

        return analyzeResponse.text;

    } catch(error) {
        console.error("Error calling Gemini API:", error);
    }
    }
}

if (!apiKey) {
  console.warn("GEMINI_API_KEY not found in .env");
}

export default AIService;