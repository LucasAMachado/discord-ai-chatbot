import express from 'express';
import dotenv from 'dotenv';
import { initDiscordBot } from './services/discordService.js';

dotenv.config();

// import env variables
const PORT = process.env.PORT || 3000;

const app = express();

// Add the json parser middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the api');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

initDiscordBot().then(() => {
    console.log('The discord bot has been initialized successfully.');
}).catch(error => console.error('There was an error when initializing discord bot ->', error));