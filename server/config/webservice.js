//var config = require("./config-" + process.env.NODE_ENV + ".js");
var config = require('../config/config-' + process.env.NODE_ENV + '.js');

exports.webUrl = function() {
    return config.webUrl();
};
exports.dbUrl = function() {
    return config.dbUrl();
};
