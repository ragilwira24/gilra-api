var mongoose = require('mongoose');
const constantDB = require('./mongoose.constant');

exports.configureMongoose = function(environment) {
    
    let dbURI = constantDB.getMongoDBURI(environment);
    
    mongoose.connect(dbURI,{ useNewUrlParser: true});
    mongoose.Promise = global.Promise;

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

}