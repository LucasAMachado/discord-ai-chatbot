# Simple Discord bot AI using Node.js, Discord.js, and Google Gemini API

## How to run the project

First, clone the repository and run `npm i`

Then you must get your Google AI Studio API key and configure your Discord bot. 

### Setting up API Keys

1. Obtain a Google AI Studio API key
   - Visit https://makersuite.google.com/app/apikey
   - Create a new API key
   - Create a .env file in the root directory 
   - Add this line: `GOOGLE_AI_STUDIO_KEY=your-api-key-here`

2. Setup our Discord bot
   - Go to https://discord.com/developers/applications
   - Click "New Application" and give it a name
   - Go to the "Bot" tab and click "Add Bot"
   - Under the bot's username, click "Reset Token" and then "Copy"
   - Add this to your .env file: `DISCORD_TOKEN=your-discord-token-here`
   - On the same page, under "Privileged Gateway Intents", enable "Message Content Intent"

### Adding the bot to your server

- In the Discord Developer Portal, go to the "OAuth2" tab
- Scroll down to "OAuth2 URL Generator"
- Under "Scopes", select "bot"
- Under "Bot Permissions", select the permissions your bot needs (at minimum, "Send Messages")
- Copy the generated URL and open it in a new browser tab
- Select a server to add your bot to (you must have the "Manage Server" permission)

### Running the bot

- Navigate to the src folder by running `cd src`
- Then run `npm run dev`

You can now interact with the bot in your Discord server. Available commands are:
- `!model`
- `!history`
- `!clear_history`
- `!newChat`
- `!help`

Note: There's a limit on how frequently you can send messages to avoid hitting API rate limits.
