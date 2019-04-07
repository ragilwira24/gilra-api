const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConstant = require('./gilra-utils/databases/database.constants');
const dbUtil = require('./gilra-utils/databases/database.util');
const logging = require('./gilra-utils/logging/logging');

var app = express();
app.use(cors());

let environment = dbConstant.DEV_ENVIRONMENT; // Change whenever environment changes 
let dbType = dbConstant.DB_TYPE_MONGODB; // Change whenever db changes
let driver = dbConstant.DB_DRIVER_MONGOOSE; // Change if you want switch between sequelize and mongoose

dbUtil.connectDB(environment, dbType, driver);
logging.info('DB Setup Success');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var routes = require('./gilra-plugin/base/base.routes');
app.use('/api',routes);

let port = 3000;

app.listen(port, () =>{
    logging.info('Server running on port number: ' + port);
});