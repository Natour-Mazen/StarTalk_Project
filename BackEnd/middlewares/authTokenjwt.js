const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserToken = require('../models/UserToken');

// Load environment variables from .env file
dotenv.config();
const secretKey = process.env.SECRET_JWT_KEY;

const authMiddleware = (allowedRoles) => (req, res, next) => {
  // Get the 'access Token' cookie from the request
  const accessToken = req.cookies["accessToken"];

  if (!accessToken) {
    return res.status(401).json({ message: 'No token found' });
  }

  // Verify the token
  jwt.verify(accessToken, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({message: 'Invalid or expired token'});
    }

    // Check if the decoded token includes a role property
    if (!decoded.roles || !allowedRoles.includes(decoded.roles)) {
      return res.status(403).json({message: 'Access forbidden.'});
    }

    const userToken = await UserToken.findOne({UserId: decoded.id});

    // Check if the user is logged in or logged out by an admin
    if (!userToken) {
      return res.status(415).json({message: 'User has been logged out'});
    }

    //Add the user to the request to use it more easily
    req.client = {
      id: decoded.id,
      name: decoded.name,
      roles: decoded.roles,
    };

    // Move to the next function (middleware or route manager)
    next();
  });
};

module.exports = authMiddleware;