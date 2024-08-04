# Simple Discord bot AI using Node.js, Discord.js, and Google Gemini API

## How to run the project

First, clone the repository and run `npm i`

Then you must get your Google Gemini API key and then configure your Discord bot. 

### Setting up API Keys

1. Obtain a Google Gemini API key
   - Visit the Google Gemini website 
   - Simply create a new project and then generate the API key
   - Create a .env file in the root directory 
   - Put `GEMINI_API_KEY=--your api key---`
   - You can find your API key by simply copying it from your dashboard in Google AI Studio

2. Setup our Discord bot
   - Go to https://discord.com/developers 
   - Create a new bot 
   - On the sidebar, hit Bot 
   - Once you are on that page, then click copy right under Token 
   - This is your DISCORD_TOKEN 
   - Add it in your .env file such as `DISCORD_TOKEN=--your token--`
   - On the same page as the token, scroll down until you see 'Message Content Intent' and make sure that it is turned on 

### Adding the bot to your server

- Click OAuth2 in the sidebar 
- Scroll down to OAuth2 URL Generator 
- Select bot and then copy the URL 
- Open this URL in a new page
- You have to make sure that you have created a Discord server 
- You can add the bot to that server once you have created it from the URL

### Running the bot

- Navigate to the src folder by running `cd src`
- Then run `npm run dev`

Then you can open your chat with the chat bot and you can run the following commands:
- `!model`
- `!history`
- `!clear_history`
- `!newChat`
- `!help`

You have a limit on the amount that you can send and it is setup so that it is limited.

It is that simple. Hope you enjoy!