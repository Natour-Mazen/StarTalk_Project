const express = require('express');
const routerAdmin = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middlewares/authTokenjwt')
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const allowedRolesForRouteAdminUser = 'ROLE_ADMIN'

// Get all users
routerAdmin.get('/',  authenticateToken(allowedRolesForRouteAdminUser) ,async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one user
routerAdmin.get('/:id',  authenticateToken(allowedRolesForRouteAdminUser) ,getUser, (req, res) => {
    res.json(res.user);
});


// Create one user
routerAdmin.post('/',  authenticateToken(allowedRolesForRouteAdminUser),async (req, res) => {
    const user = new User({
        pseudo: req.body.pseudo,
        id: req.body.id,
        allCitations: req.body.allCitations,
        allFavorite: req.body.allFavorite
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one user
routerAdmin.patch('/:id',  authenticateToken(allowedRolesForRouteAdminUser) ,getUser, async (req, res) => {
    if (req.body.pseudo != null) {
        res.user.pseudo = req.body.pseudo;
    }
    if (req.body.id != null) {
        res.user.id = req.body.id;
    }
    if (req.body.allCitations != null) {
        res.user.allCitations = req.body.allCitations;
    }
    if (req.body.allFavorite != null) {
        res.user.allFavorite = req.body.allFavorite;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one user
routerAdmin.delete('/:id', authenticateToken(allowedRolesForRouteAdminUser) ,getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Deleted User' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = routerAdmin;
