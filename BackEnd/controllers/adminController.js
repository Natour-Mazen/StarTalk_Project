const User = require('../models/User');
const Citation = require("../models/Citation");

class AdminController {
    // Retrieve all users
    static async getAllUsers(req, res) {
        const page = parseInt(req.query.page) || 1; // par défaut à la page 1
        const limit = parseInt(req.query.limit) || 5; // par défaut 5 utilisateurs par page
        const skip = (page - 1) * limit;

        try {
            const users = await User.find().skip(skip).limit(limit);
            const total = await User.countDocuments();

            res.json({
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                users
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    static async addCitationByAdmin(req, res) {
        try {
            // Récupérer l'ID de l'utilisateur et les détails de la citation à partir de la requête
            const { title, description, humor } = req.body;
            const userId  = req.params.id;

            // Trouver l'utilisateur par ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Créer une nouvelle citation
            const citation = new Citation({
                title,
                description,
                writerId: user._id,
                writerName: user.pseudo,
                humor
            });

            // Ajouter la citation à la liste des citations de l'utilisateur
            user.allCitations.push(citation._id);

            // Sauvegarder la citation et l'utilisateur
            await citation.save();
            await user.save();
            
            res.status(201).json({
                message: 'Citation added successfully',
                citation,
                user
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    // Retrieve a specific user by ID
    static async getUserById(req, res, next) {
        let user;
        try {
            // Attempt to find a user by their ID
            user = await User.findById(req.params.id);

            // If the user is not found, return a 404 response
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' });
            }
        } catch (err) {
            // If an error occurs during the retrieval, return a 500 response
            return res.status(500).json({ message: err.message });
        }

        // If the user is found, attach the user object to the response for later use
        res.user = user;
        next();
    }

    // Create a new user
    static async createUser(req, res) {
        // Create a new User object based on the request body
        const user = new User({
            pseudo: req.body.pseudo,
            id: req.body.id,
            allCitations: req.body.allCitations,
            allFavorite: req.body.allFavorite
        });

        try {
            // Attempt to save the new user to the database
            const newUser = await user.save();

            // Return a 201 response with the newly created user
            res.status(201).json(newUser);
        } catch (err) {
            // If an error occurs during the creation, return a 400 response with the error message
            res.status(400).json({ message: err.message });
        }
    }

    // Update an existing user
    static async updateUser(req, res) {
        // Update user properties if they are provided in the request body
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
            // Attempt to save the updated user to the database
            const updatedUser = await res.user.save();

            // Return the updated user in the response
            res.json(updatedUser);
        } catch (err) {
            // If an error occurs during the update, return a 400 response with the error message
            res.status(400).json({ message: err.message });
        }
    }

    // Delete a user
    static async deleteUser(req, res) {
        try {
            // Attempt to remove the user from the database
            await res.user.remove();

            // Return a 200 response indicating successful deletion
            res.json({ message: 'Deleted User' });
        } catch (err) {
            // If an error occurs during the deletion, return a 500 response with the error message
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = AdminController;
