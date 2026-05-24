import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 30000
});

export const sendMessageToAI = async (message, personality) => {
    try {
        const response = await API.post("/chat", {
            message,
            personality
        });

        return response.data;
    } catch (error) {
        const serverMessage =
            error.response?.data?.reply ||
            error.response?.data?.message ||
            "Server not responding. Please try again.";

        return {
            success: false,
            reply: serverMessage
        };
    }
};

export const generateChatTitle = async (message) => {
    try {
        const response = await API.post("/chat/title", { message });
        return response.data;
    } catch (error) {
        return { success: false, title: "New Chat" };
    }
};
