const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables from .env file
dotenv.config();
const DISCORD_BOTID = process.env.BOT_ID;

const DiscordBotMiddleware = (allowedRoles) => async (req, res, next) => {

    // Check if the bot ID is the same as the one in the .env
    if (req.Botid !== DISCORD_BOTID) {
        return res.status(403).json({message: 'Access forbidden. Invalid bot ID.'});
    }

    let user = await User.findOne({discordId: req.id});

    // If the user doesn't exist in the User table, create a new user
    if (!user) {
        user = new User({
            discordId: req.id,
            pseudo: req.name,
            Role: 'ROLE_USER',
            allCitations: [],
            allFavorite: []
        });
        await user.save();
    }

    // Check if the decoded token includes a role property
    if (!user.Role || !allowedRoles.includes(user.Role)) {
        return res.status(403).json({message: 'Access forbidden.'});
    }

    //Add the user to the request to use it more easily
    req.client = {
        id: user.discordId,
        name: user.pseudo,
        roles: user.Role,
    };

    // Move to the next function (middleware or route manager)
    next();
};

module.exports = DiscordBotMiddleware;
