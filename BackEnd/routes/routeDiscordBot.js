/*const express = require('express');
const routerDiscordBot = express.Router();
const UserController = require('../controllers/userController');
const CitationController = require('../controllers/citationController');
const botMiddleWare = require('../middlewares/botDiscordmiddleware');


const allowedRolesForRouteDiscord = ['ROLE_USER','ROLE_ADMIN'];

routerDiscordBot.get('citations/@me',botMiddleWare(allowedRolesForRouteDiscord),UserController.getUserCitations );

routerDiscordBot.get('citations/specUser',botMiddleWare(allowedRolesForRouteDiscord),UserController.getSpecificUserCitations );

routerDiscordBot.get('citations/fav/@me',botMiddleWare(allowedRolesForRouteDiscord),UserController.getUserFavorites );

routerDiscordBot.post('citations/', botMiddleWare(allowedRolesForRouteDiscord), CitationController.createCitation);


module.exports = routerDiscordBot;*/
const DiscordBotController = require('../controllers/discordBotController');
const DiscordBotMiddleware = require("../middlewares/botDiscordmiddleware");

function withMiddleware(handler) {
    return async function(botId, userId, userName, idUserToRead, allowedRoles) {
        const middleware = new DiscordBotMiddleware(botId, userId, userName, idUserToRead, allowedRoles);
        const client = await middleware.handle();

        // Call the handler with the client
        return handler(client);
    };
}

DiscordBotController.getUserCitations = withMiddleware(DiscordBotController.getUserCitations);
DiscordBotController.getSpecificUserCitations = withMiddleware(DiscordBotController.getSpecificUserCitations);
DiscordBotController.getUserFavorites = withMiddleware(DiscordBotController.getUserFavorites);


// Appelez getUserCitations dans le code du bot
//const citations = await DiscordBotController.getUserCitations(botId, userId, userName, idUserToRead);


