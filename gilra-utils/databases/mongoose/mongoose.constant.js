const dotenv = require('dotenv');
dotenv.config();

const MONGO_DB_START_URL = `${process.env.MONGO_DB_START_URL}`;
const GLOBAL_DB_HOST =  `${process.env.GLOBAL_DB_HOST}`;
const MONGO_DB_PORT = `${process.env.MONGO_DB_PORT}`;

exports.getMongoDBURI = function(environment) {
    let MONGO_DB_SCHEMA = '/' + schemaDB(environment);
    return MONGO_DB_START_URL + GLOBAL_DB_HOST + ':' + MONGO_DB_PORT + MONGO_DB_SCHEMA; 
}

function schemaDB(environment) {
    
    let schema = `${process.env.MONGO_DB_NAME_DEV}`;
    
    switch (environment) {
        case "STAGING":
            schema = `${process.env.MONGO_DB_NAME_STAGING}`;
            break;
        case "PRODUCTION":
            schema = `${process.env.MONGO_DB_NAME_PRODUCTION}`;
            break;
        default: 
            break;
    }

    return schema;
}