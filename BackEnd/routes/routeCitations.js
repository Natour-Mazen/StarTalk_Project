const express = require('express');
const routerCitations = express.Router();
const CitationController = require('../controllers/citationController');
const authenticateToken = require('../middlewares/authTokenjwt');

const allowedRolesForRouteCitation = ['ROLE_USER','ROLE_ADMIN'];

routerCitations.get('/', CitationController.getAllCitations);
routerCitations.get('/random', CitationController.getRandomCitations);

routerCitations.get('/search',authenticateToken(allowedRolesForRouteCitation), CitationController.searchCitations);

routerCitations.get('/possiblehumors', authenticateToken(allowedRolesForRouteCitation), CitationController.getAllCitationsHumor);

routerCitations.get('/:id', authenticateToken(allowedRolesForRouteCitation), CitationController.getCitationById);
routerCitations.get('/possiblehumor/:id', authenticateToken(allowedRolesForRouteCitation), CitationController.getHumorById);

routerCitations.post('/', authenticateToken(allowedRolesForRouteCitation), CitationController.createCitation);

routerCitations.patch('/:id', authenticateToken(allowedRolesForRouteCitation), CitationController.updateCitation);

routerCitations.patch('/:id/like', authenticateToken(allowedRolesForRouteCitation), CitationController.likeCitation);
routerCitations.patch('/:id/unlike', authenticateToken(allowedRolesForRouteCitation), CitationController.unLikeCitation);

routerCitations.patch('/:id/fav', authenticateToken(allowedRolesForRouteCitation), CitationController.favoriteCitation);
routerCitations.patch('/:id/unfav', authenticateToken(allowedRolesForRouteCitation), CitationController.unFavoriteCitation);

routerCitations.delete('/:id', authenticateToken(allowedRolesForRouteCitation), CitationController.deleteCitation);

module.exports = routerCitations;
