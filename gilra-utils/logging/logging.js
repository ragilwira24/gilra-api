var moment = require('moment');
const logKey = require('./logging.constant');

const nowDate = moment(new Date()).format();

var strings = [];

exports.info = function (msg) {

    let infoLog = logKey.LOGGING_INFO;
    strings.push(infoLog);
    strings.push(nowDate);
    strings.push(msg);

    console.log(strings.join(' '));
    strings = [];

}