const User = require('../models/User');

class UserController {

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
            const user = await User.findOne({ _id: req.client.id }).populate({ path: 'allCitations', options: { sort: { 'creationDate': -1 } } });
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
            const user = await User.findOne({ _id: req.client.id }).populate({ path: 'allFavorite', options: { sort: { 'creationDate': -1 } } });
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
            const user = await User.findOne({ _id: req.client.id }).populate({ path: 'allLiked', options: { sort: { 'creationDate': -1 } } });
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
