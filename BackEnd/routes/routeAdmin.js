const express = require('express');
const routerAdmin = express.Router();
const AdminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authTokenjwt');

const allowedRolesForRouteAdminUser = 'ROLE_ADMIN';

routerAdmin.get('/', authenticateToken(allowedRolesForRouteAdminUser), AdminController.getAllUsers);

routerAdmin.get('/:id', authenticateToken(allowedRolesForRouteAdminUser), AdminController.getUserById);

routerAdmin.post('/', authenticateToken(allowedRolesForRouteAdminUser), AdminController.createUser);

routerAdmin.patch('/:id', authenticateToken(allowedRolesForRouteAdminUser), AdminController.updateUser);

routerAdmin.delete('/:id', authenticateToken(allowedRolesForRouteAdminUser), AdminController.deleteUser);

module.exports = routerAdmin;
