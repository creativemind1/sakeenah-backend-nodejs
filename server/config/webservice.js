//var config = require("./config-" + process.env.NODE_ENV + ".js");
var config = require("../config/config-" + process.env.NODE_ENV + ".js");

exports.webUrl = function() {
  console.log("==== weburl ====", process.env.NODE_ENV);
  return config.webUrl();
};
exports.dbUrl = function() {
  console.log("==== dbUrl ====", process.env.NODE_ENV);
  return config.dbUrl();
};
