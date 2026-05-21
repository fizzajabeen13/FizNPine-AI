const { generateAIResponse } = require("../services/aiService");

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

const chatController = async (req, res) => {

    try {

        const { message, personality = "friendly" } = req.body || {};

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        console.log("User Message:", message);
        console.log("Personality:", personality);

        const prompt = generatePrompt(message, personality);

        let aiReply;

        try {
            aiReply = await generateAIResponse(prompt);
        } catch (aiError) {
            console.log("AI SERVICE ERROR:", aiError);

            return res.status(500).json({
                success: false,
                message: "AI service failed",
                error: aiError.message
            });
        }

        res.json({
            success: true,
            reply: aiReply
        });

    } catch (error) {

        console.log("Controller Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = {
    chatController
};