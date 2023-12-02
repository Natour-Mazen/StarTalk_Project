const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const routerAuth = express.Router();
const dotenv = require('dotenv');
const User = require('../models/User');
const UserTokenModel = require('../models/UserToken');
const authenticateToken = require("../middlewares/authTokenjwt");

dotenv.config();

const clientId = process.env.CLIENT_ID_Discord;
const clientSecret = process.env.CLIENT_SECRET_Discord;
const redirectUri = process.env.REDIRECT_URI_Discord;
const secretKey = process.env.SECRET_JWT_KEY;

// Function to generate Discord authorization URL
function getDiscordAuthUrl() {
    return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`
}

// Function to exchange authorization code for access token
async function exchangeCodeForResponseData(code) {
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

// Function to get user's Discord profile using access token
async function getDiscordUserProfile(accessToken) {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    const userResponse = await axios.get('https://discord.com/api/users/@me', { headers });
    return userResponse.data;
}

// Function to create a new user object in the database
function createNewUser(discordUser) {
    return new User({
        discordId: discordUser.id,
        pseudo: discordUser.username,
        Role: 'ROLE_USER',
        allCitations:[],
        allFavorite:[]
    });
}

// Function to create a new userToken object in the database
function createNewUserToken(UserID,Token) {
    return new UserTokenModel({
        discordUserId: UserID,
        jwtToken: Token
    });
}

// Function to generate JWT for the user
function generateJwtToken(user,tokenExp) {
    const expirationDate = new Date(Date.now() + (tokenExp * 1000));
    const tokenPayload = {
        id: user.discordId,
        name: user.pseudo,
        roles: user.Role,
        exp: expirationDate.getTime() / 1000
    };
    return jwt.sign(tokenPayload, secretKey);
}

routerAuth.get('/login', (req, res) => {
    const url = getDiscordAuthUrl();
    res.redirect(url);
});

// Logout route
routerAuth.get('/logout', authenticateToken('ROLE_USER'), async (req, res) => {
    // Find user token in the database based on discordUserId
    const existingUser = await UserTokenModel.findOne({ discordUserId: req.client.id });
    // If the user token exists, delete it from the database
    if (existingUser) {
        await UserTokenModel.deleteOne({ _id: existingUser._id });
    }
    // Clear the "accessToken" cookie
    res.clearCookie('accessToken');
    // Redirect to the home page
    //res.redirect("/");
    res.status(200).json({
        message : "logout is okay"
    })
});

// Callback route for handling OAuth2 callback from Discord
routerAuth.get('/callback', async (req, res) => {
    // Extract the authorization code from the query parameters
    const code = req.query.code;

    try {
        // Exchange the authorization code for response data from Discord
        const myResponseData = await exchangeCodeForResponseData(code);

        // Extract the access token from the response data
        const accessToken = myResponseData.access_token;

        // Get the Discord user profile using the access token
        const discordUser = await getDiscordUserProfile(accessToken);

        // Create a new user in the local database based on the Discord user profile
        const newUserDB = createNewUser(discordUser);

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ discordId: newUserDB.discordId });

        // If the user doesn't exist, save the new user to the database
        if (!existingUser) {
            await newUserDB.save();
        }

        // Generate a JWT token for the user and set its expiration time
        const token = generateJwtToken(newUserDB, myResponseData.expires_in);

        // Create a new user token and save it to the database
        const newUserToken = createNewUserToken(newUserDB.discordId, token);
        await newUserToken.save();

        // Set the "accessToken" cookie with the JWT token
        res.cookie('accessToken', token, {
            httpOnly: true,   // Accessible only by the web server
            secure: true,      // Use secure (HTTPS) connection
            sameSite: 'None',  // Allow cross-site cookies
            maxAge: myResponseData.expires_in
        });

        // Redirect to the home page
        res.redirect("/");
    } catch (err) {
        // Handle errors by sending a 500 Internal Server Error response
        res.status(500).json({ message: err.message });
    }
});

module.exports = routerAuth;
// Set the "accessToken" cookie with the JWT token
/*  res.cookie('accessToken', token, {
      httpOnly: true,   // Accessible only by the web server
      secure: process.env.NODE_ENV === 'production',  // Use secure (HTTPS) connection in production
      sameSite: 'None',  // Allow cross-site cookies
      domain: 'startalk-project.vercel.app',  // Replace with your actual domain
      maxAge: myResponseData.expires_in * 1000000000,  // Set the expiration time in milliseconds
  });*/