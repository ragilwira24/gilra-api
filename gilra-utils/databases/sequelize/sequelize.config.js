var Sequilize = require('sequelize');
const constant = require('../database.constants');
const postgres = require('./postgres/postgres.constant');
const mysql = require('./mysql/mysql.constant');

const logging = require('../../logging/logging');
const seqConstant = require('./sequelize.constant');

exports.configureSequelize = function(environment, dbType) {

    var config = getConfig(environment, dbType);

    var sequelize = new Sequilize(config.schema, config.username, config.password,{
        dialect: dbType,
        port: config.port
    });

    sequelize.authenticate().then(function(err) {
        logging.info('Connection has been established successfully.');
    }, function(err) {
        console.log('Unable to connect to the database:', err);
    });
    
}



function getConfig(environment, dbType) {
    var configs = {};

    switch (dbType) {
        case constant.DB_TYPE_MYSQL:
            configs = mysql.setConfiguration(environment);
            break;
        case constant.DB_TYPE_POSTGRES:
            configs = postgres.setConfiguration(environment);
            break;
        default:
            break;
    }

    return configs;
}