// middleware/oidcAuth.js
const { requiresAuth } = require('express-openid-connect');



module.exports = requiresAuth();
