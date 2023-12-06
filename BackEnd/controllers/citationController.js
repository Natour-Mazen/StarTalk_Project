const Citation = require('../models/Citation');

class CitationController {
    // Retrieve all citations with pagination
    static async getAllCitations(req, res) {
        // Parse query parameters for pagination
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        try {
            // Count total number of citations
            const totalCitations = await Citation.countDocuments();
            // Calculate total number of pages
            const totalPages = Math.ceil(totalCitations / pageSize);

            // Retrieve paginated citations from the database
            const citations = await Citation.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            // Simplify citation objects by extracting only necessary attributes
            const simplifiedCitations = citations.map(({ _id, title, description, numberLike, creationDate, writerName }) => ({
                _id,
                title,
                description,
                numberLike,
                creationDate,
                writerName,
            }));

            // Send paginated and simplified citations in the response
            res.status(200).json({
                totalPages,
                currentPage: page,
                pageSize,
                totalCitations,
                citations: simplifiedCitations,
            });
        } catch (err) {
            // Handle errors by sending a 500 Internal Server Error response
            res.status(500).json({ message: err.message });
        }
    }

    // Retrieve a specific citation by ID
    static async getCitationById(req, res, next) {
        let citation;
        try {
            // Attempt to find a citation by its ID
            citation = await Citation.findById(req.params.id);

            // If the citation is not found, return a 404 response
            if (citation == null) {
                return res.status(404).json({ message: 'Cannot find citation' });
            }
        } catch (err) {
            // If an error occurs during the retrieval, return a 500 response
            return res.status(500).json({ message: err.message });
        }

        // If the citation is found, attach the citation object to the response for later use
        res.citation = citation;
        next();
    }

    // Create a new citation
    static async createCitation(req, res) {
        // Create a new Citation object based on the request body
        const citation = new Citation({
            title: req.body.title,
            description: req.body.description,
            numberLike: req.body.numberLike,
            writerId: req.client.id,
            writerName: req.client.name,
        });

        try {
            // Attempt to save the new citation to the database
            const newCitation = await citation.save();

            // Return a 201 response with the newly created citation
            res.status(201).json(newCitation);
        } catch (err) {
            // If an error occurs during the creation, return a 400 response with the error message
            res.status(400).json({ message: err.message });
        }
    }

    // Update an existing citation
    static async updateCitation(req, res) {
        // Check if the user trying to update the citation is the original author
        if (req.client.id !== res.citation.writerId)
            return res.status(403).json({ message: 'Access forbidden.' });

        // Update citation properties if they are provided in the request body
        if (req.body.title != null) {
            res.citation.title = req.body.title;
        }
        if (req.body.description != null) {
            res.citation.description = req.body.description;
        }
        if (req.body.numberLike != null) {
            res.citation.numberLike = req.body.numberLike;
        }

        try {
            // Attempt to save the updated citation to the database
            const updatedCitation = await res.citation.save();

            // Return the updated citation in the response
            res.json(updatedCitation);
        } catch (err) {
            // If an error occurs during the update, return a 400 response with the error message
            res.status(400).json({ message: err.message });
        }
    }

    static async likeCitation(req, res) {
        const citation = await Citation.findById(req.params.id);
        citation.likes.push(req.client.id);
        citation.numberLike = citation.likes.length;
        await citation.save();
        res.send(citation);
    }

    static async unLikeCitation(req, res) {
        const citation = await Citation.findById(req.params.id);
        const index = citation.likes.indexOf(req.client.id);
        if (index > -1) {
            citation.likes.splice(index, 1);
            citation.numberLike = citation.likes.length;
            await citation.save();
            res.send(citation);
        } else {
            res.status(404).send({ message: 'Like not found for this citation' });
        }
    }

    // Delete a citation
    static async deleteCitation(req, res) {
        // Check if the user trying to delete the citation is the original author
        if (req.client.id !== res.citation.writerId)
            return res.status(403).json({ message: 'Access forbidden.' });

        try {
            // Attempt to remove the citation from the database
            await res.citation.remove();

            // Return a 200 response indicating successful deletion
            res.status(200).json({ message: 'Deleted Citation' });
        } catch (err) {
            // If an error occurs during the deletion, return a 500 response with the error message
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = CitationController;
