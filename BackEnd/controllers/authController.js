const axios = require('axios');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const UserTokenModel = require('../models/UserToken');

dotenv.config();

class AuthController {
    constructor() {
        this.clientId = process.env.CLIENT_ID_Discord;
        this.clientSecret = process.env.CLIENT_SECRET_Discord;
        this.redirectUri = process.env.REDIRECT_URI_Discord;
        this.secretKey = process.env.SECRET_JWT_KEY;
    }

    // Function to generate Discord authorization URL
    getDiscordAuthUrl() {
        return `https://discord.com/api/oauth2/authorize?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&response_type=code&scope=identify`;
    }

    // Function to exchange authorization code for access token
    async exchangeCodeForResponseData(code) {
        const data = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirectUri,
            scope: 'identify'
        };

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/x-www-form-urlencoded',
        };

        const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams(data), { headers });
        return response.data;
    }

    // Function to get user's Discord profile using access token
    async getDiscordUserProfile(accessToken) {
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const userResponse = await axios.get('https://discord.com/api/users/@me', { headers });
        return userResponse.data;
    }

    // Function to create a new user object in the database
    createNewUser(discordUser) {
        return new User({
            discordId: discordUser.id,
            pseudo: discordUser.username,
            Role: 'ROLE_USER',
            allCitations: [],
            allFavorite: []
        });
    }

    // Function to create a new userToken object in the database
    createNewUserToken(UserID, Token) {
        return new UserTokenModel({
            discordUserId: UserID,
            jwtToken: Token
        });
    }

    // Function to generate JWT for the user
    generateJwtToken(user, tokenExp) {
        const expirationDate = new Date(Date.now() + (tokenExp * 1000));
        const tokenPayload = {
            id: user.discordId,
            name: user.pseudo,
            roles: user.Role,
            exp: expirationDate.getTime() / 1000
        };
        return jwt.sign(tokenPayload, this.secretKey);
    }
}

module.exports = AuthController;
