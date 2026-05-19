const { generateAIResponse } = require("../services/aiService");

// Generate prompt based on personality
const generatePrompt = (message, personality) => {

    const basePrompts = {
        friendly: "You are a friendly AI assistant.",
        professional: "You are a professional AI assistant.",
        teacher: "You are a helpful teacher explaining concepts simply.",
        motivational: "You are a motivational coach.",
        funny: "You are a funny and witty assistant.",
        medical: "You are a medical assistant. Give safe general advice only."
    };

    return `
${basePrompts[personality] || basePrompts.friendly}

User: ${message}
`;
};

// Controller
const chatController = async (req, res) => {

    try {

        const { message, personality } = req.body;

        console.log("User Message:", message);
        console.log("Personality:", personality);

        // Create prompt
        const prompt = generatePrompt(message, personality);

        // Send to AI
        const aiReply = await generateAIResponse(prompt);

       const cleanReply = aiReply;

        res.json({
            success: true,
            reply: cleanReply
        });

    } catch (error) {

        console.log("Controller Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    chatController
};