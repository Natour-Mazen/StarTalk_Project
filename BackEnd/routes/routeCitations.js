const express = require('express');
const routerCitations = express.Router();
const Citation = require('../models/Citation.js');
const authenticateToken = require('../middlewares/authTokenjwt')
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const allowedRolesForRouteCitation = 'ROLE_USER'

// Get all citations with pagination
routerCitations.get('/',  async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const totalCitations = await Citation.countDocuments();
        const totalPages = Math.ceil(totalCitations / pageSize);

        const citations = await Citation.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        // Extract only the desired attributes from each citation
        const simplifiedCitations = citations.map(({ _id, title, description, numberLike, creationDate, writerName }) => ({
            _id,
            title,
            description,
            numberLike,
            creationDate,
            writerName,
        }));

        res.json({
            totalPages,
            currentPage: page,
            pageSize,
            totalCitations,
            citations: simplifiedCitations,
        });
        res.status(200)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one citation
routerCitations.get('/:id', authenticateToken(allowedRolesForRouteCitation), getCitation, (req, res) => {
    // Extract only the desired attributes from res.citation
    const {_id, title, description, numberLike, creationDate, writerName } = res.citation;

    // Create a new object with the extracted attributes
    const simplifiedCitation = {
        _id,
        title,
        description,
        numberLike,
        creationDate,
        writerName,
    };

    // Send the simplified citation in the response
    res.json(simplifiedCitation);
});

// Create new citation
routerCitations.post('/', authenticateToken(allowedRolesForRouteCitation) ,async (req, res) => {
    const citation = new Citation({
        title: req.body.title,
        description: req.body.description,
        numberLike: req.body.numberLike,
        writerId : req.client.id,
        writerName : req.client.name,
    });

    try {
        const newCitation = await citation.save();
        res.status(201).json(newCitation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one citation
routerCitations.patch('/:id',  authenticateToken(allowedRolesForRouteCitation) ,getCitation, async (req, res) => {
    if(req.client.id !== res.citation.writerId)
        return res.status(403).json({ message: 'Access forbidden.' });

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
        const updatedCitation = await res.citation.save();
        res.json(updatedCitation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one citation
routerCitations.delete('/:id',  authenticateToken(allowedRolesForRouteCitation) ,getCitation, async (req, res) => {
    if(req.client.id !== res.citation.writerId)
        return res.status(403).json({ message: 'Access forbidden.' });
    try {
        await res.citation.remove();
        res.status(200).json({message: 'Deleted Citation'})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getCitation(req, res, next) {
    let citation;
    try {
        citation = await Citation.findById(req.params.id);
        if (citation == null) {
            return res.status(404).json({ message: 'Cannot find citation' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.citation = citation;
    next();
}

module.exports = routerCitations;
