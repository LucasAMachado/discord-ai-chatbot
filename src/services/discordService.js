import { Client, GatewayIntentBits } from 'discord.js';
import { DISCORD_TOKEN } from '../config/config.js';
import { GeminiService } from './geminiService.js';
import { splitMessage } from '../utils/splitMessges.js';


export const initDiscordBot = () => {

    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    const geminiService = new GeminiService();

    const availableCommands = geminiService.commands;
    console.log(availableCommands)

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
    });

    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;

        message.channel.sendTyping();
        try {
            const response = await geminiService.sendMessage(message.content);
            const messageParts = splitMessage(response);

            for (const part of messageParts) {
                await message.channel.send(part);
            }
        } catch (error) {
            console.error('Error dealing with message:', error);
            if (error.status === 429) {
                await message.channel.send("To many messages at in a short time span.");
            } else {
                await message.channel.send('There was an error sorry!');
            }
        }
    });

    return client.login(DISCORD_TOKEN);
}