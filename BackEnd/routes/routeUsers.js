const express = require('express');
const routerUsers = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middlewares/authTokenjwt')
const dotenv = require('dotenv');
const UserController = require('../controllers/userController');

// Load environment variables from .env file
dotenv.config();

const allowedRolesForRouteUser = ['ROLE_USER','ROLE_ADMIN']


// Get the profile of the connected user
routerUsers.get('/@me', authenticateToken(allowedRolesForRouteUser), async (req, res) => {
    res.json({
        name: req.client.name,
        roles: req.client.roles,
        id: req.client.id
    });
});

routerUsers.get('/profile/allcitations', authenticateToken(allowedRolesForRouteUser), UserController.getAllUserCitations);
routerUsers.get('/profile/alllikes', authenticateToken(allowedRolesForRouteUser), UserController.getAllUserLiked);
routerUsers.get('/profile/allfavorites', authenticateToken(allowedRolesForRouteUser), UserController.getAllUserFavorites);

module.exports = routerUsers;
