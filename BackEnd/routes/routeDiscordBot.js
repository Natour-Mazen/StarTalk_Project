const express = require('express');
const routerDiscordBot = express.Router();
const UserController = require('../controllers/userController');
const CitationController = require('../controllers/citationController');
const botMiddleWare = require('../middlewares/botDiscordmiddleware');

const allowedRolesForRouteDiscord = ['ROLE_USER','ROLE_ADMIN'];

routerDiscordBot.get('citations/',botMiddleWare(allowedRolesForRouteDiscord),UserController.getUserCitations );

routerDiscordBot.get('citations/specUser',botMiddleWare(allowedRolesForRouteDiscord),UserController.getSpecificUserCitations );

routerDiscordBot.get('citations/fav',botMiddleWare(allowedRolesForRouteDiscord),UserController.getUserFavorites );

routerDiscordBot.post('citations/', botMiddleWare(allowedRolesForRouteDiscord), CitationController.createCitation);



module.exports = routerDiscordBot;

