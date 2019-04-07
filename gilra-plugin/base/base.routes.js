var express = require('express');
var app = express();

var auth_routes = require('../gilra-user-management/routes/auth/auth.routes');

app.use('/auth', auth_routes);

module.exports = app;