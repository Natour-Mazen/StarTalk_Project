const express = require('express');
const routerUsers = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middlewares/authTokenjwt')
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const allowedRolesForRouteUser = 'ROLE_USER'


// Get the profile of the connected user
routerUsers.get('/@me', authenticateToken(allowedRolesForRouteUser), async (req, res) => {
    res.json({
        name: req.client.name,
        roles: req.client.roles
    });
});

module.exports = routerUsers;
