const dotenv = require('dotenv');
dotenv.config();

const dbconstant = require('../../database.constants');

const POSTGRES_DB_PORT = `${process.env.POSTGRES_DB_PORT}`;
const POSTGRES_DB_USER = `${process.env.POSTGRES_DB_USER}`;
const POSTGRES_DB_PASSWORD = `${process.env.POSTGRES_DB_PASSWORD}`;

function getUsername(){
    return POSTGRES_DB_USER;
}

function getPassword() {
    return POSTGRES_DB_PASSWORD;
}

function getPort() {
    return POSTGRES_DB_PORT;
}

function getSchemaDB(environment) {
    let schema = `${process.env.POSTGRES_DB_NAME_DEV}`;
    
    switch (environment) {
        case dbconstant.STAGING_ENVIRONMENT:
            schema = `${process.env.POSTGRES_DB_NAME_STAGING}`;
            break;
        case dbconstant.PRODUCTION_ENVIRONMENT:
            schema = `${process.env.POSTGRES_DB_NAME_PRODUCTION}`;
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