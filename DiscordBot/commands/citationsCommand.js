// commands/citationsCommand.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('discord.js');
const generateCitationsEmbed = require('../functions/citationsEmbed.js');
const { TextInputStyle } = require('discord.js');
const CitationDiscordController = require('../controllers/citationsDiscordController.js');

class citationsCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('stt-cits')
            .setDescription('Test')
            .addSubcommand(subCommand =>
                subCommand
                    .setName('add')
                    .setDescription('Add a new masterpiece to your collection')
            )
            .addSubcommand(subCommand =>
                subCommand
                    .setName('all')
                    .setDescription('Get a random selection of your citations')
            )
            .addSubcommand(subCommand =>
                subCommand
                    .setName('get')
                    .setDescription('Get a random selection of citations from the chosen user')
                    .addUserOption(option =>
                        option.setName('target').setDescription('user').setRequired(true)
                    )
            )
            .addSubcommand(subCommand =>
                subCommand
                    .setName('fav')
                    .setDescription('Get a random selection of your favorite citations')
            )
            .toJSON();

        this.handleChatCommand = this.handleChatCommand.bind(this);
        this.handleModalCommand = this.handleModalCommand.bind(this);
    }

    async handleChatCommand(interaction) {
        // Handle citations command logic
        const subCommand = interaction.options.getSubcommand();
        const excitasInst = new CitationDiscordController(interaction);

        switch (subCommand) {
            case 'add':
                const addmodal = this.createAddModal();
                interaction.showModal(addmodal);
                break;

            case 'all':
                const mycitations = await excitasInst.getMyRandCitationsFromAPI();
                const outputAll = generateCitationsEmbed(interaction.member.user, mycitations);
                interaction.reply({embeds: [outputAll]});
                break;

            case 'get':
                try{
                    const userTarget = interaction.options.getUser('target');
                    const targetId = userTarget.id;
                    const targetcitations = await excitasInst.getSpecUserRandCitationsFromAPI(targetId);
                    const outputtargetAll = generateCitationsEmbed(userTarget, targetcitations,false,false);
                    interaction.reply({embeds: [outputtargetAll]});
                }catch (e) {
                    interaction.reply("Oh no, something went wrong. But don't worry, even shooting stars fall sometimes. 🌠");
                }
                break;

            case 'fav':
                const mycitationsfav = await excitasInst.getMyFavRandCitationsFromAPI();
                const outputAllfav = generateCitationsEmbed(interaction.member.user, mycitationsfav,true,true);
                interaction.reply({embeds: [outputAllfav]});
                break;

            default:
            // Handle unknown subcommands
        }
    }
    async handleModalCommand(interaction) {
        const userTag = interaction.member.user.tag
        const fieldTitle = interaction.fields.getTextInputValue('titre')
        const fieldCitation = interaction.fields.getTextInputValue('citation')

        interaction.reply({
            content: `Bonjour ${userTag}, votre citation ${fieldTitle} a bien été ajoutée : ${fieldCitation}`,
        });
    }

    createAddModal(){
        const modal = new ModalBuilder()
            .setTitle('Ajout d\'une citation')
            .setCustomId('addCitationModal')
            .setComponents(
                new ActionRowBuilder()
                    .setComponents(
                        new TextInputBuilder()
                            .setLabel('Titre')
                            .setCustomId('titre')
                            .setStyle(TextInputStyle.Short)
                    ),
                new ActionRowBuilder()
                    .setComponents(
                        new TextInputBuilder()
                            .setLabel('Citation')
                            .setCustomId('citation')
                            .setStyle(TextInputStyle.Paragraph)
                    ),
            );

      return modal;
    }
}

module.exports = new citationsCommand();

