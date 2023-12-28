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
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', commandHandler.handleInteraction);

async function main(){
    await commandHandler.registerCommands();
    try {
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}

main()