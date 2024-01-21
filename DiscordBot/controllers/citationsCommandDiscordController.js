const DiscordBotController = require('../../BackEnd/controllers/discordBotController');
const DiscordBotMiddleware = require("../../BackEnd/middlewares/botDiscordmiddleware");

// Class to handle citation commands in Discord
class CitationCommandDiscordController {
    // Constructor to initialize the class with interaction data
    constructor(interaction) {
        this.userId = interaction.member.user.id;
        this.userName = interaction.member.user.username;
        this.botId = process.env.DISCORD_BOT_CLIENT_ID;
        this.middleware = new DiscordBotMiddleware(this.botId, this.userId, this.userName);
    }

    // Method to get the client from the middleware
    async getClient() {
        return await this.middleware.handle();
    }

    // Method to add new citations from the user to the API
    async addNewCitationsFromMeToAPI(title, desc) {
        const client = await this.getClient();
        await DiscordBotController.addCitation(client, title, desc);
    }

    // Method to get random citations of the user from the API
    async getMyRandCitationsFromAPI() {
        const client = await this.getClient();
        return await DiscordBotController.getUserCitations(client);
    }

    // Method to get random favorite citations of the user from the API
    async getMyFavRandCitationsFromAPI() {
        const client = await this.getClient();
        return await DiscordBotController.getRandomFavoritesForUser(client);
    }

    // Method to get random Liked citations of the user from the API
    async getMyLikesRandCitationsFromAPI() {
        const client = await this.getClient();
        return await DiscordBotController.getRandomLikesForUser(client);
    }

    // Method to get random citations of a specific user from the API
    async getSpecUserRandCitationsFromAPI(targetuserId) {
        const middleware = new DiscordBotMiddleware(this.botId, this.userId, this.userName,targetuserId);
        const client = await middleware.handle();
        return await DiscordBotController.getSpecificUserCitations(client);
    }
}

// Exporting the class
module.exports = CitationCommandDiscordController;
