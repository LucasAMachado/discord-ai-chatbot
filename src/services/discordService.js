import { Client, GatewayIntentBits } from 'discord.js';
import { DISCORD_TOKEN } from '../config/config.js';
import { GeminiService } from './geminiService.js';
import { splitMessage } from '../utils/splitMessges.js';


// This function will initialize the discord bot and return the client
// Does not make much sense but if one wants to host there server it will make it easier to do so
export const initDiscordBot = () => {

    // Create a new client instance
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    // Create a new instance of the GeminiService
    const geminiService = new GeminiService();

    // Log when the client is ready to go
    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
    });



    // Listen for messages in the chat and respond to them
    client.on('messageCreate', async (message) => {

        // This is to make sure that the bot does not keep responding to itself
        if (message.author.bot) return;

        // Sends a typing animation in discord 
        message.channel.sendTyping();

        try {
            const response = await geminiService.sendMessage(message.content);
            // Need to split the message response up becuase discord has a limit of the amount of characters 
            const messageParts = splitMessage(response);

            for (const part of messageParts) {
                await message.channel.send(part);
            }
        } catch (error) {
            // This was the error messsage that I was getting for sending messages to fast so we have to deal with them
            if (error.status === 429) {
                await message.channel.send("To many messages at in a short time span.");
            } else {
                await message.channel.send('There was an error sorry!');
            }
        }
    });

    return client.login(DISCORD_TOKEN);
}