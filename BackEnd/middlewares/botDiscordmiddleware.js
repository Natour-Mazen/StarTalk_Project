const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables from .env file
dotenv.config();
const DISCORD_BOT_ID = process.env.DISCORD_BOTID;
const allowedRoles = ['ROLE_USER','ROLE_ADMIN'];
class DiscordBotMiddleware {

    constructor(botId, userId, userName, idUserToRead) {
        this.botId = botId;
        this.userId = userId;
        this.userName = userName;
        this.idUserToRead = idUserToRead;
    }

    async handle() {
        // Check if the bot ID is the same as the one in the .env
        if (this.botId !== DISCORD_BOT_ID) {
            throw new Error('Access forbidden. Invalid bot ID.');
        }

        let user = await User.findOne({discordId: this.userId});

        // If the user doesn't exist in the User table, create a new user
        if (!user) {
            user = new User({
                discordId: this.userId,
                pseudo: this.userName,
                Role: 'ROLE_USER',
                allCitations: [],
                allFavorite: []
            });
            await user.save();
        }

        // Check if the user's role is included in the allowed roles
        if (!user.Role || !allowedRoles.includes(user.Role)) {
            throw new Error('Access forbidden.');
        }

        // Return the user to use it more easily
        return {
            id: user.discordId,
            name: user.pseudo,
            roles: user.Role,
            idUserToRead: this.idUserToRead
        };
    }
}

module.exports = DiscordBotMiddleware;



/*const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables from .env file
dotenv.config();
const DISCORD_BOT_ID = process.env.BOT_ID;

const DiscordBotMiddleware = (allowedRoles) => async (req, res, next) => {

    // Check if the bot ID is the same as the one in the .env
    if (req.body.botid !== DISCORD_BOT_ID) {
        return res.status(403).json({message: 'Access forbidden. Invalid bot ID.'});
    }

    let user = await User.findOne({discordId: req.body.userid});

    // If the user doesn't exist in the User table, create a new user
    if (!user) {
        user = new User({
            discordId: req.body.userid,
            pseudo: req.body.username,
            Role: 'ROLE_USER',
            allCitations: [],
            allFavorite: []
        });
        await user.save();
    }

    // Check if the user's role is included in the allowed roles
    if (!user.Role || !allowedRoles.includes(user.Role)) {
        return res.status(403).json({message: 'Access forbidden.'});
    }

    //Add the user to the request to use it more easily
    req.client = {
        id: user.discordId,
        name: user.pseudo,
        roles: user.Role,
        idUserToRead : req.body.idUserToRead
    };

    // Move to the next function (middleware or route manager)
    next();
};

module.exports = DiscordBotMiddleware;
*/