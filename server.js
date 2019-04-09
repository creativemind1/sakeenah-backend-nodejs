// FileName: index.js
// Import express
require("dotenv").config();
let express = require("express"); 
let apiRoutes = require("./server/routes/post");
let bodyParser = require("body-parser");
// Import Mongoose
let mongoose = require("mongoose");
var webService = require("./server/config/webservice");
var webUrl = webService.webUrl();
var config = require("./server/config/config-" + process.env.NODE_ENV + ".js");
const path = require("path");

// Initialize the app
const app = express();
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect(config.dbUrl(), {
  useNewUrlParser: true
});
var db = mongoose.connection;

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
//app.get("/", (req, res) => res.send("Hello World with Express"));
// Use Api routes in the App
app.use("/api", apiRoutes);

// // application -------------------------------------------------------------
// app.get("*", function(req, res) {
//   res.sendfile("./controller/public/index.html"); // load the single view file (angular will handle the page changes on the front-end)
// });

// Launch app to listen to specified port
app.listen(port, function() {
  console.log("Running RestHub on port " + port);
});
