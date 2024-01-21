// commands/citationsCommand.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('discord.js');
const generateCitationsEmbed = require('../functions/citationsEmbed.js');
const { TextInputStyle } = require('discord.js');
const CitationCommandDiscordController = require('../controllers/citationsCommandDiscordController.js');

class citationsCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('stt-cits')
            .setDescription('Principal command for StarTalk Bot')
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
            .addSubcommand(subCommand =>
                subCommand
                    .setName('liked')
                    .setDescription('Get a random selection of your liked citations')
            )
            .toJSON();

        this.handleChatCommand = this.handleChatCommand.bind(this);
        this.handleModalCommand = this.handleModalCommand.bind(this);
    }

    async handleChatCommand(interaction) {
        // Handle citations command logic
        const subCommand = interaction.options.getSubcommand();
        const citCommInst = new CitationCommandDiscordController(interaction);

        switch (subCommand) {
            case 'add':
                const addmodal = this.createAddModal();
                interaction.showModal(addmodal);
                break;

            case 'all':
                const mycitations = await citCommInst.getMyRandCitationsFromAPI();
                const outputAll = generateCitationsEmbed(interaction.member.user, mycitations);
                interaction.reply({embeds: [outputAll]});
                break;

            case 'get':
                try{
                    const userTarget = interaction.options.getUser('target');
                    const targetId = userTarget.id;
                    const targetcitations = await citCommInst.getSpecUserRandCitationsFromAPI(targetId);
                    const outputtargetAll = generateCitationsEmbed(userTarget, targetcitations,false,false);
                    interaction.reply({embeds: [outputtargetAll]});
                }catch (e) {
                    if (e.message === "Cannot find user") {
                        interaction.reply("Oh, it seems like the user you're looking for hasn't joined our citation-sharing party yet. " +
                            "Maybe they're out there, lost in a sea of words. 🌊📚 Why not send them an invite to join our literary fiesta? 🎉📖");
                    } else {
                        interaction.reply("Oh no, something went wrong. But don't worry, even shooting stars fall sometimes. 🌠");
                    }
                }
                break;

            case 'fav':
                const mycitationsfav = await citCommInst.getMyFavRandCitationsFromAPI();
                const outputAllfav = generateCitationsEmbed(interaction.member.user, mycitationsfav,true,true);
                interaction.reply({embeds: [outputAllfav]});
                break;

            case 'liked':
                const mycitationslike = await citCommInst.getMyLikesRandCitationsFromAPI();
                const outputAlllikes = generateCitationsEmbed(interaction.member.user, mycitationslike,false,false,true);
                interaction.reply({embeds: [outputAlllikes]});
                break;

            default:
                // Handle unknown subcommands
        }
    }
    async handleModalCommand(interaction) {
        const citCommInst = new CitationCommandDiscordController(interaction);
        const userTag = interaction.member.user.tag
        const fieldTitle = interaction.fields.getTextInputValue('titre')
        const fielddescription = interaction.fields.getTextInputValue('citation')

        try {
            await citCommInst.addNewCitationsFromMeToAPI(fieldTitle,fielddescription);
            interaction.reply({
                content: `Hello ${userTag}, your citation '${fieldTitle}' has been added. It's now shining in our collection like a literary diamond! 💎📚`,
            });
        } catch (error) {
            interaction.reply("Oh no, it seems like your citation got lost in the sea of words. But don't worry, even the best writers crumple a few pages. Let's try again! 📝🗑️");
        }


    }

    createAddModal(){
        const modal = new ModalBuilder()
            .setTitle('Ajout d\'une citation')
            .setCustomId('addCitationModal')
            .setComponents(
                new ActionRowBuilder()
                    .setComponents(
                        new TextInputBuilder()
                            .setLabel('Title')
                            .setCustomId('titre')
                            .setStyle(TextInputStyle.Short)
                    ),
                new ActionRowBuilder()
                    .setComponents(
                        new TextInputBuilder()
                            .setLabel('Description')
                            .setCustomId('citation')
                            .setStyle(TextInputStyle.Paragraph)
                    ),
            );

      return modal;
    }
}

module.exports = new citationsCommand();

