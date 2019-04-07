var express = require('express');

var router = express.Router();

const verifyToken = require('../../../../gilra-utils/authentication/jwt-authentication/verify-token');
var authController = require('../../controller/auth/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/test' ,verifyToken, authController.testingApi);

module.exports = router;