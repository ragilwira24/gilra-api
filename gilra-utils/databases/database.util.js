const mongooseConfig = require('./mongoose/mongoose.config');
const sequelizeConfig = require('./sequelize/sequelize.config');

exports.connectDB = function(environment, dbType, driver) {
    var constant = require('./database.constants');
    
    switch (driver) {
        case constant.DB_DRIVER_MONGOOSE:
            mongooseConfig.configureMongoose(environment);
            break;
        case constant.DB_DRIVER_SEQUELIZE:
            sequelizeConfig.configureSequelize(environment, dbType);
            break;
        default:
            console.error.bind(console,"Cannot find the driver");
            break;
    }

}