// commandHandler.js
const { Routes } = require('discord.js');
const citationsCommand = require('../commands/citationsCommand.js');
const quoiCommand = require('../commands/quoi.js');
const { config } = require('dotenv');

config();

const CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID;
class CommandHandler {
    constructor(rest) {
        this.rest = rest;
        this.commands = [
            citationsCommand,
            quoiCommand
        ];
    }

    handleInteraction = async (interaction) => {
        if (interaction.isChatInputCommand()){
            const commandChatHandlers = {
                'stt-cits': citationsCommand.handleChatCommand,
                'quoi': quoiCommand.handleChatCommand,
            };
            const handler = commandChatHandlers[interaction.commandName];
            if (handler) {
                await handler(interaction);
            }
        } else if (interaction.isModalSubmit()){
            const commandModalHandlers = {
                'addCitationModal': citationsCommand.handleModalCommand,
            };
            const handler = commandModalHandlers[interaction.customId];
            if (handler) {
                await handler(interaction);
            }
        }else{
            throw new Error();
        }

    }

    async registerCommands() {
        try{
            console.log('Started refreshing application (/) commands.');

            const commandData = this.commands.map(command => command.commandData);
            await this.rest.put(Routes.applicationCommands(CLIENT_ID), {
                body: commandData
            });

            console.log('Successfully reloaded application (/) commands.');
        }catch (err){
            console.log(err)
        }
    }
}

module.exports = CommandHandler;