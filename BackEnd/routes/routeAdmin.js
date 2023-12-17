const express = require('express');
const routerAdmin = express.Router();
const AdminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authTokenjwt');

const allowedRolesForRouteAdminUser = 'ROLE_ADMIN';

routerAdmin.get('/', authenticateToken(allowedRolesForRouteAdminUser), AdminController.getAllUsers);

routerAdmin.get('/allcitation/:id', authenticateToken(allowedRolesForRouteAdminUser), AdminController.getUserCitationById);


routerAdmin.post('/addcitation/:id', authenticateToken(allowedRolesForRouteAdminUser), AdminController.addCitationByAdmin);
routerAdmin.post('/', authenticateToken(allowedRolesForRouteAdminUser), AdminController.createUser);


routerAdmin.patch('/:id', authenticateToken(allowedRolesForRouteAdminUser), AdminController.updateUser);

routerAdmin.delete('/:id', authenticateToken(allowedRolesForRouteAdminUser), AdminController.deleteUser);
routerAdmin.delete('/removecitation/:id/:citationId', authenticateToken(allowedRolesForRouteAdminUser), AdminController.deleteUserCitationById);

module.exports = routerAdmin;
