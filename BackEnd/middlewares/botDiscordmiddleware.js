const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables from .env file
dotenv.config();
const DISCORD_BOT_ID = process.env.BOT_ID;

const DiscordBotMiddleware = (allowedRoles) => async (req, res, next) => {

    // Check if the bot ID is the same as the one in the .env
    if (req.botId !== DISCORD_BOT_ID) {
        return res.status(403).json({message: 'Access forbidden. Invalid bot ID.'});
    }

    let user = await User.findOne({discordId: req.userId});

    // If the user doesn't exist in the User table, create a new user
    if (!user) {
        user = new User({
            discordId: req.userId,
            pseudo: req.userName,
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
        idUserToRead : req.idUserToRead
    };

    // Move to the next function (middleware or route manager)
    next();
};

module.exports = DiscordBotMiddleware;
