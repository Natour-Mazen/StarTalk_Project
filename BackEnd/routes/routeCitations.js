const express = require('express');
const routerCitations = express.Router();
const CitationController = require('../controllers/CitationController');
const authenticateToken = require('../middlewares/authTokenjwt');

const allowedRolesForRouteCitation = 'ROLE_USER';

routerCitations.get('/', CitationController.getAllCitations);

routerCitations.get('/:id', authenticateToken(allowedRolesForRouteCitation), CitationController.getCitationById);

routerCitations.post('/', authenticateToken(allowedRolesForRouteCitation), CitationController.createCitation);

routerCitations.patch('/:id', authenticateToken(allowedRolesForRouteCitation), CitationController.updateCitation);

routerCitations.delete('/:id', authenticateToken(allowedRolesForRouteCitation), CitationController.deleteCitation);

module.exports = routerCitations;
