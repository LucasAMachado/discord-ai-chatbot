# simple discord bot ai using node js, discord js and google gemini api

## How to run the project

First clone the repository and run `npm i`

then you must get your google gemni api key and then configure your disord bot 

### Setting up API Keys

1. obtain a google gemini api key
   - visit the google gemini website 
   - simply create a new project and then generate the api key
   - create a .env file in the root directory 
   - put `GEMINI_API_KEY=--your api key---`
   - you can find your api key by simply copying it from your dashboard in google ai studio

2. setup our discord bot
   - go to https://discord.com/developers 
   - create a new bot 
   - on the side bar hit bot 
   - once you are on that page then click copy right under token 
   - this is your DISCORD_TOKEN 
   - add it in your .env file such as `DISCORD_TOKEN=--your token--`
   - on the same page as the token scroll down until you see 'Message Content Intent' and make sure that it is turned on 

### Adding the bot to your server

- click OAuth2 in the side bar 
- scroll down to OAuth2 URL Generator 
- select bot and then copy the url 
- open this url in a new page
- you have to make sure that you have created a discord server 
- you can add the bot to that server once you have created it from the url

### Running the bot

- navigate to the src folder by running `cd src`
- then run `npm run dev`

then you can open your chat with the chat bot and you can run the following commands:
- `!model`
- `!history`
- `!clear_history`
- `!newChat`
- `!help`

you have a limit on the ammout that you can send and it is setup so that it is limited

it is that simple hope you enjoy