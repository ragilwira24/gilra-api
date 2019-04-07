const dotenv = require('dotenv');
dotenv.config();

const dbconstant = require('../../database.constants');

const MYSQL_DB_PORT = `${process.env.MYSQL_DB_PORT}`;
const MYSQL_DB_USER = `${process.env.MYSQL_DB_USER}`;
const MYSQL_DB_PASSWORD = `${process.env.MYSQL_DB_PASSWORD}`;

function getUsername(){
    return MYSQL_DB_USER;
}

function getPassword() {
    return MYSQL_DB_PASSWORD;
}

function getPort() {
    return MYSQL_DB_PORT;
}

function getSchemaDB(environment) {
    let schema = `${process.env.MYSQL_DB_NAME_DEV}`;
    
    switch (environment) {
        case dbconstant.STAGING_ENVIRONMENT:
            schema = `${process.env.MYSQL_DB_NAME_STAGING}`;
            break;
        case dbconstant.PRODUCTION_ENVIRONMENT:
            schema = `${process.env.MYSQL_DB_NAME_PRODUCTION}`;
            break;
        default: 
            break;
    }

    return schema;
}

exports.setConfiguration = function(environment) {
    let configs = {
        username : getUsername(),
        password : getPassword(),
        port : getPort(),
        schema: getSchemaDB(environment)
    };

    return configs;
}