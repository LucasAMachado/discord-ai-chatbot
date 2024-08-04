import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from '../config/config.js';

// Create a simple class to handle the Gemini API
class GeminiService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        this.commands = ['!model', '!history', '!clear_history', '!newChat', '!help'];
        this.chatHistory = [];
        this.messageCount = 0;
        this.model = null;
        this.minTimeBetweenRequests = 1000;
    }

    async sendMessage(message) {
        // Check if the message is a command
        if (this.commands.includes(message)) {
            return this.respondToCommand(message);
        }

        // Rate limit the requests
        await this.rateLimitRequest();

        // Initialize the model if it has not been already 
        if (!this.model) {
            this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        }

        try {
            // Start a new chat session
            const chat = this.model.startChat({
                history: this.chatHistory,
                generationConfig: {
                    maxOutputTokens: 1000,
                },
            });

            // Send the message to the model
            const result = await chat.sendMessage(message);
            let fullResponse = '';

            // We have to get the response in chunks first and then 
            // append them to the fullResponse 
            // this makes sure that we are able to get all of the text in one response rather than in multiple chunks
            if (result.response && result.response.text) {
                fullResponse = result.response.text();
            } else if (result.stream) {
                for await (const chunk of result.stream) {
                    fullResponse += chunk.text();
                }
            } else {
                throw new Error("Error with format of response");
            }

            this.messageCount++;

            // Keep track of our own chat history for commands 
            this.chatHistory.push({ role: "user", parts: [{ text: message }] });
            this.chatHistory.push({ role: "model", parts: [{ text: fullResponse }] });

            return fullResponse;
        } catch (error) {
            // This is the error that i was getting when I was sending messages to fast
            // So we can set a timout and then try again this can be done a better way but this is a simple way to do it
            if (error.status === 429) {
                console.error("Rate limit exceeded. Retrying in 5 seconds, it should not crash just wait a bit");
                // keep tyring to send the message after 5 seconds
                await new Promise(resolve => setTimeout(resolve, 5000));
                return this.sendMessage(message);
            }
            console.error("Error occured", error);
            return "There was an issue when dealing with the message";
        }
    }

    // This function will make sure that we are not sending messages to fast to the API
    // it does this by checking the time between the last request and the current request
    async rateLimitRequest() {
        const now = Date.now();
        const timeElapsed = now - this.lastRequestTime;
        if (timeElapsed < this.minTimeBetweenRequests) {
            await new Promise(resolve => setTimeout(resolve, this.minTimeBetweenRequests - timeElapsed));
        }
        this.lastRequestTime = Date.now();
    }


    getChatHistory() {
        if (this.chatHistory.length === 0) {
            return "No chat history available.";
        }
        // format the history by grouping the user and model messages together
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
                return 'The command you typed was not found. type !help for a list of commands';
        }
    }
}

export { GeminiService };