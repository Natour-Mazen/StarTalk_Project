const { SlashCommandBuilder } = require('@discordjs/builders');

class quoiCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('quoi')
            .setDescription('La commande pour lancer la bombe atomique')
            .toJSON();

        this.handleChatCommand = this.handleChatCommand.bind(this);
    }

    async handleChatCommand(interaction) {
        interaction.channel.send({content: 'feur'});
        interaction.channel.send({content: '@everyone'});
    }
}

module.exports = new quoiCommand();
