const User = require('../models/User');

class UserController {

    // Helper function to retrieve a random number of citations for a specific user
    static async getRandomCitationsForUser(discordId, res) {
        try {
            // Find the user by their discordId
            const user = await User.findOne({ discordId: discordId });

            // If the user is not found, return a 404 response
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' });
            }

            // Get all citations written by the user
            const userCitations = user.allCitations;

            // Generate a random number between 1 and 15
            const randomNumber = Math.floor(Math.random() * 15) + 1;

            // Get a random subset of citations
            const randomCitations = userCitations.sort(() => 0.5 - Math.random()).slice(0, randomNumber);

            // Send the random citations in the response
            res.status(200).json(randomCitations);
        } catch (err) {
            // Handle errors by sending a 500 Internal Server Error response
            res.status(500).json({ message: err.message });
        }
    }

    // Retrieve a random number of citations for the current user
    static async getUserCitations(req, res) {
        return this.getRandomCitationsForUser(req.client.id, res);
    }

    // Retrieve a random number of citations for a specific user
    static async getSpecificUserCitations(req, res) {
        return this.getRandomCitationsForUser(req.client.idUserToRead, res);
    }

    // Helper function to retrieve a random number of favorite citations for a specific user
    static async getRandomFavoritesForUser(discordId, res) {
        try {
            // Find the user by their discordId
            const user = await User.findOne({ discordId: discordId });

            // If the user is not found, return a 404 response
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' });
            }

            // Get all favorite citations of the user
            const userFavorites = user.allFavorite;

            // Generate a random number between 1 and 15
            const randomNumber = Math.floor(Math.random() * 15) + 1;

            // Get a random subset of favorite citations
            const randomFavorites = userFavorites.sort(() => 0.5 - Math.random()).slice(0, randomNumber);

            // Send the random favorite citations in the response
            res.status(200).json(randomFavorites);
        } catch (err) {
            // Handle errors by sending a 500 Internal Server Error response
            res.status(500).json({ message: err.message });
        }
    }

    // Retrieve a random number of favorite citations for the current user
    static async getUserFavorites(req, res) {
        return this.getRandomFavoritesForUser(req.client.id, res);
    }

    // Retrieve a random number of favorite citations for a specific user
    static async getSpecificUserFavorites(req, res) {
        return this.getRandomFavoritesForUser(req.client.idUserToRead, res);
    }
}

module.exports = UserController;
