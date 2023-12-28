const DiscordBotController = require('../../BackEnd/controllers/discordBotController');
const DiscordBotMiddleware = require("../../BackEnd/middlewares/botDiscordmiddleware");
class CitationDiscordController {

    constructor(interaction) {
        this.userId = interaction.member.user.id;
        this.userName = interaction.member.user.username;
        this.botId = process.env.DISCORD_BOT_CLIENT_ID;
    }

    async getMyRandCitationsFromAPI() {
        const middleware = new DiscordBotMiddleware(this.botId, this.userId, this.userName);
        const client = await middleware.handle();

        const citations = await DiscordBotController.getUserCitations(client);

        return citations;
    }
    async getMyFavRandCitationsFromAPI() {
        const middleware = new DiscordBotMiddleware(this.botId, this.userId, this.userName);
        const client = await middleware.handle();

        const favcitations = await DiscordBotController.getRandomFavoritesForUser(client);

        return favcitations;
    }

    async getSpecUserRandCitationsFromAPI(targetuserId) {
        const middleware = new DiscordBotMiddleware(this.botId, this.userId, this.userName,targetuserId);
        const client = await middleware.handle();

        const usercitations = await DiscordBotController.getSpecificUserCitations(client);

        return usercitations;
    }



}

module.exports = CitationDiscordController;