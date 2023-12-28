// main.js
const { Client, GatewayIntentBits, REST } = require('discord.js');
const { config } = require('dotenv');
const CommandHandler = require('../DiscordBot/handlers/commandHandler.js');


config();

const TOKEN =  process.env.DISCORD_BOT_TOKEN_ACCESS;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN_ACCESS);

const commandHandler = new CommandHandler(rest);

client.on('ready', () => {
    console.log(`Logged to discord as ${client.user.tag}!`);
});

client.on('interactionCreate', commandHandler.handleInteraction);

async function DiscordBotmain(){
    console.log("==========START DISCORD BOT==========")
    await commandHandler.registerCommands();
    try {
       await client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
    console.log("======================================")
}

module.exports = DiscordBotmain;