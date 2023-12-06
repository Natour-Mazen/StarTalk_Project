const axios = require('axios');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const UserTokenModel = require('../models/UserToken');

dotenv.config();

// Retrieve environment variables
const clientId = process.env.CLIENT_ID_Discord;
const clientSecret = process.env.CLIENT_SECRET_Discord;
const redirectUri = process.env.REDIRECT_URI_Discord;
const secretKey = process.env.SECRET_JWT_KEY;

class AuthController {
    // Get Discord authorization URL
    static getDiscordAuthUrl() {
        return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`;
    }

    // Exchange authorization code for access token
    static async exchangeCodeForResponseData(code) {
        const data = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            scope: 'identify'
        };

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/x-www-form-urlencoded',
        };

        const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams(data), { headers });
        return response.data;
    }

    // Get user's Discord profile using access token
    static async getDiscordUserProfile(accessToken) {
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const userResponse = await axios.get('https://discord.com/api/users/@me', { headers });
        return userResponse.data;
    }

    // Create a new user object in the database
    static createNewUser(discordUser) {
        return new User({
            discordId: discordUser.id,
            pseudo: discordUser.username,
            Role: 'ROLE_USER',
            allCitations: [],
            allFavorite: [],
            allLiked: []
        });
    }

    // Create a new userToken object in the database
    static createNewUserToken(UserID, Token) {
        return new UserTokenModel({
            UserId: UserID,
            jwtToken: Token
        });
    }

    // Generate JWT for the user
    static generateJwtToken(user, tokenExp) {
        const expirationDate = new Date(Date.now() + (tokenExp * 1000));
        const tokenPayload = {
            id: user._id,
            name: user.pseudo,
            roles: user.Role,
            exp: expirationDate.getTime() / 1000
        };
        return jwt.sign(tokenPayload, secretKey);
    }

    // Handle OAuth2 callback from Discord
    static async handleOAuthCallback(code) {
        try {
            // Exchange the authorization code for response data from Discord
            const myResponseData = await AuthController.exchangeCodeForResponseData(code);
            const accessToken = myResponseData.access_token;

            // Get the Discord user profile using the access token
            const discordUser = await AuthController.getDiscordUserProfile(accessToken);

            // Create a new user in the local database based on the Discord user profile
            const newUserDB = AuthController.createNewUser(discordUser);

            // Check if the user already exists in the database
            const existingUser = await User.findOne({ _id: newUserDB._id });

            // If the user doesn't exist, save the new user to the database
            if (!existingUser) {
                await newUserDB.save();
            }

            // Generate a JWT token for the user and set its expiration time
            const token = AuthController.generateJwtToken(newUserDB, myResponseData.expires_in);

            // Create a new user token and save it to the database
            const newUserToken = AuthController.createNewUserToken(newUserDB._id, token);
            await newUserToken.save();

            // Return the token and its expiration time
            return {
                token,
                expires_in: myResponseData.expires_in,
            };
        } catch (err) {
            // Handle errors by throwing the exception
            throw err;
        }
    }

    // Handle user logout
    static async handleLogout(discordUserId) {
        // Find user token in the database based on discordUserId
        const existingUser = await UserTokenModel.findOne({ discordUserId });

        // If the user token exists, delete it from the database
        if (existingUser) {
            await UserTokenModel.deleteOne({ _id: existingUser._id });
        }

        // Return a message indicating successful logout
        return { message: "logout is okay" };
    }
}

module.exports = AuthController;
