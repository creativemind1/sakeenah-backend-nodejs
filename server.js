// FileName: index.js
// Import express
require("dotenv").config();
let express = require("express");
var multer = require("multer");
let apiRoutes = require("./server/routes/apiRoutes");
let cmsRoutes = require("./server/routes/cmsRoutes");
let authRoutes = require("./server/routes/authRoutes");
let bodyParser = require("body-parser");
// Initialize the app
const app = express();
// Import Mongoose
//let mongoose = require("mongoose");
var webService = require("./server/config/webservice");
var webUrl = webService.webUrl();
var config = require("./server/config/config-" + process.env.NODE_ENV + ".js");
const path = require("path");
var cors = require("cors");
var jwt = require("jsonwebtoken");
// // Create a storage object with a given configuration
// const storage = require("multer-gridfs-storage")({
//   url: config.dbUrl()
// });

// // Set multer storage engine to the newly created object
// const upload = multer({ storage: storage });

// //let Grid = require("gridfs-stream");

// // Connect to Mongoose and set connection variable
// mongoose.connect(config.dbUrl(), {
//   useNewUrlParser: true
// });
// var db = mongoose.connection;

var mongoose = require("mongoose");
mongoose.connect(config.dbUrl());
var conn = mongoose.connection;
var multer = require("multer");

const DIR = "./thumbnail/";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + path.extname(file.originalname)
    );
  }
});
let upload = multer({ storage: storage });

//let gfs = Grid(db, mongoose);

// Configure bodyparser to handle post requests
app.use(cors());
app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());

function authChecker(req, res, next) {
  if (req.path.startsWith("/cms") || req.path.startsWith("/api")) {
    var verify = jwt.verify(
      req.body.token,
      config.secret(),
      {
        expiresIn: "24h" // expires in 24 hours
      },
      (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: "Token is not valid"
          });
        } else {
          req.decoded = decoded;
          next();
        }
      }
    );
  } else {
    next();
  }
}
app.use(authChecker);
// Setup server port
var port = process.env.PORT || 8080;
app.set("superSecret", config.secret()); // secret variable

// Send message for default URL
//app.get("/", (req, res) => res.send("Hello World with Express"));
// Use Api routes in the App

app.post("/upload", upload.array("uploads[]", 12), function(req, res) {
  console.log("==== Server JS ====", req.file, " == resp ===", res);
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    console.log("file received");
    return res.send({
      success: true
    });
  }
});
app.use("/api", apiRoutes);
app.use("/cms", cmsRoutes);
app.use("/auth", authRoutes);

// Launch app to listen to specified port
app.listen(port, function() {
  console.log("Running RestHub on port " + port);
});
