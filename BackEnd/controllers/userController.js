const User = require('../models/User');

class UserController {

    // Helper function to retrieve a random number of citations for a specific user
    static async getRandomCitationsForUser(discordId, res) {
        try {
            // Find the user by their discordId
            const user = await User.findOne({ _id: discordId });

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
            const user = await User.findOne({ _id: discordId });

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

    // Add a created citation to allCitations
    static async addCreatedCitation(req, citationId) {
        try {
            const user = await User.findOne({ _id: req.client.id });
            if (user == null) {
                throw new Error('Cannot find user');
            }
            user.allCitations.push(citationId);
            await user.save();
        } catch (err) {
            throw err;
        }
    }

    // Add a liked citation to allLiked
    static async addLikedCitation(req, citationId) {
        try {
            const user = await User.findOne({ _id: req.client.id });
            if (user == null) {
                throw new Error('Cannot find user');
            }
            user.allLiked.push(citationId);
            await user.save();
        } catch (err) {
            throw err;
        }
    }


    // Remove a liked citation from allLiked
    static async removeLikedCitation(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ _id: req.client.id });
                if (user == null) {
                    reject('Cannot find user');
                }
                const citationId = req.body.citationId;
                const index = user.allLiked.indexOf(citationId);
                if (index > -1) {
                    user.allLiked.splice(index, 1);
                    await user.save();
                    resolve();
                } else {
                    reject('Citation not found in allLiked.');
                }
            } catch (err) {
                reject(err.message);
            }
        });
    }

    // Add a favorited citation to allFavorite
    static async addFavoriteCitation(req, citationId) {
        try {
            const user = await User.findOne({ _id: req.client.id });
            if (user == null) {
                throw new Error('Cannot find user');
            }
            user.allFavorite.push(citationId);
            await user.save();
        } catch (err) {
            throw err;
        }
    }

    // Remove a favorited citation from allFavorite
    static async removeFavoriteCitation(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ _id: req.client.id });
                if (user == null) {
                    reject('Cannot find user');
                }
                const citationId = req.body.citationId;
                const index = user.allFavorite.indexOf(citationId);
                if (index > -1) {
                    user.allFavorite.splice(index, 1);
                    await user.save();
                    resolve();
                } else {
                    reject('Citation not found in allFavorite.');
                }
            } catch (err) {
                reject(err.message);
            }
        });
    }

    // Retrieve all citations of a user
    static async getAllUserCitations(req, res) {
        try {
            const user = await User.findOne({ _id: req.client.id }).populate('allCitations');
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' });
            }
            res.status(200).json(user.allCitations);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Retrieve all favorites of a user
    static async getAllUserFavorites(req, res) {
        try {
            const user = await User.findOne({ _id: req.client.id }).populate('allFavorite');
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' });
            }
            res.status(200).json(user.allFavorite);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Retrieve all liked citations of a user
    static async getAllUserLiked(req, res) {
        try {
            const user = await User.findOne({ _id: req.client.id }).populate('allLiked');
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' });
            }
            res.status(200).json(user.allLiked);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }




}

module.exports = UserController;
