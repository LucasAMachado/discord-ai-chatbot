import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from '../config/config.js';

class GeminiService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        this.commands = ['!model', '!history', '!clear_history', '!newChat', '!help'];
        this.chatHistory = [];
        this.messageCount = 0;
        this.model = null;
    }

    async sendMessage(message) {
        if (this.commands.includes(message)) {
            return this.respondToCommand(message);
        }

        if (!this.model) {
            this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        }

        try {
            const chat = this.model.startChat({
                history: this.chatHistory,
                generationConfig: {
                    maxOutputTokens: 1000,
                },
            });

            const result = await chat.sendMessage(message);
            let fullResponse = '';

            if (result.response && result.response.text) {
                fullResponse = result.response.text();
            } else if (result.stream) {
                // Streaming response
                for await (const chunk of result.stream) {
                    fullResponse += chunk.text();
                }
            } else {
                throw new Error("Issue with res format from Gemini API");
            }

            this.messageCount++;
            this.chatHistory.push({ role: "user", parts: [{ text: message }] });
            this.chatHistory.push({ role: "model", parts: [{ text: fullResponse }] });

            return fullResponse;
        } catch (error) {
            console.error("Error sending message:", error);
            return "Sorry, I encountered an error while processing your message.";
        }
    }

    getChatHistory() {
        if (this.chatHistory.length === 0) {
            return "No chat history available.";
        }

        return this.chatHistory.map((msg, index) =>
            `${Math.floor(index / 2) + 1}. ${msg.role}: ${msg.parts[0].text}`
        ).join('\n');
    }

    clearChatHistory() {
        this.chatHistory = [];
        this.messageCount = 0;
        return 'The chat history has been deleted.';
    }

    respondToCommand(message) {
        switch (message) {
            case '!model':
                return 'The current model is gemini-1.5-pro';
            case '!history':
                return this.getChatHistory();
            case '!clear_history':
                return this.clearChatHistory();
            case '!newChat':
                return this.clearChatHistory();
            case '!help':
                return 'The available commands are: ' + this.commands.join(', ');
            default:
                return 'Command not found, type !help for a list of commands';
        }
    }
}

export { GeminiService };