const User = require('../models/User');
const Citation = require('../models/Citation');
class DiscordBotController {

    // Helper function to retrieve a random number of citations for a specific user
    static async getRandomCitationsForUser(discordId) {
        // Find the user by their discordId
        const user = await User.findOne({ discordId: discordId }).populate('allCitations');

        // If the user is not found
        if (user == null) {
            throw new Error("Cannot find user")
        }

        // Get all citations written by the user
        const userCitations = user.allCitations;

        // Generate a random number between 1 and 4
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Get a random subset of citations
        const randomCitations = userCitations.sort(() => 0.5 - Math.random()).slice(0, randomNumber);

        // Map the random citations to an array of objects with only title and description
        const citationsToSend = randomCitations.map(citation => ({
            title: citation.title,
            description: citation.description
        }));

        // Send the random citations in the response
        return citationsToSend;
    }

    // Retrieve a random number of citations for the current user
    static async getUserCitations(client) {
        return await this.getRandomCitationsForUser(client.id);
    }

    // Retrieve a random number of citations for a specific user
    static async getSpecificUserCitations(client) {
        return await this.getRandomCitationsForUser(client.idUserToRead);
    }

    // Helper function to retrieve a random number of favorite citations for a specific user
    static async getRandomFavoritesForUser(client) {
        // Find the user by their discordId
        const user = await User.findOne({ discordId: client.id }).populate('allFavorite');;

        // If the user is not found, return a 404 response
        if (user == null) {
            throw new Error("Cannot find user")
        }
        // Get all favorite citations of the user
        const userFavorites = user.allFavorite;

        // Generate a random number between 1 and 4
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Get a random subset of citations
        const randomCitations = userFavorites.sort(() => 0.5 - Math.random()).slice(0, randomNumber);

        // Map the random citations to an array of objects with only title and description
        const citationsToSend = randomCitations.map(citation => ({
            title: citation.title,
            description: citation.description
        }));
        // Send the random favorite citations
        return citationsToSend
    }

    // Add a created citation to allCitations
    static async addCitation(client,title,desc) {

        const user = await User.findOne({ discordId: client.id });
        if (user == null) {
            throw new Error('Cannot find user');
        }

        const citation = new Citation({
            title: title,
            description: desc,
            writerId: user._id,
            writerName: user.pseudo,
        });

        const newCitation = await citation.save();
        if(newCitation == null){
            throw new Error('Error when save new citaiton');
        }

        user.allCitations.push(citation._id);
        await user.save();
    }
}

module.exports = DiscordBotController;
