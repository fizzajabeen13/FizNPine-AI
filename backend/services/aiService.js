require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ System prompt (this fixes “forgot name/personality” issue)
const systemPrompt = `
You are FizNPine AI.
Your name is FizNPine.
You are a helpful, intelligent, and friendly AI assistant built into a chatbot system.
Always maintain this identity in every response.
Be consistent and do not change your personality.
`;

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro",
});

const generateAIResponse = async (prompt) => {
    try {

        console.log("🟡 USER PROMPT:", prompt);

        // ✅ FIX: send system prompt + user prompt together
        const result = await model.generateContent([
            systemPrompt,
            prompt
        ]);

        const response = await result.response;
        const text = response.text();

        console.log("🟢 AI RESPONSE:", text);

        return text;

    } catch (error) {

        console.log("🔴 GEMINI ERROR:");
        console.log(error);

        return "AI error occurred. Please try again.";
    }
};

module.exports = {
    generateAIResponse
};