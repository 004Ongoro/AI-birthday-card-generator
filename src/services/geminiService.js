import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast"; // Import HotToast for error messages

const apiKey = process.env.REACT_APP_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const generateBirthdayMessage = async (name, age) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a short and cheerful birthday message for ${name}, who is turning ${age} years old.`;

    const response = await model.generateContent(prompt);

    console.log("AI Response:", response);

    if (!response || !response.response) {
      toast.error("AI response is empty.");
      return "Wishing you a fantastic birthday filled with joy and happiness! 🎉";
    }

    const text = response.response.text();
    if (!text || text.trim() === "") {
      toast.error("AI returned an empty message.");
      return "Wishing you a fantastic birthday filled with joy and happiness! 🎉";
    }

    return text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    toast.error("Failed to generate message. Check API key and network.");
    return "Wishing you a fantastic birthday filled with joy and happiness! 🎉";
  }
};