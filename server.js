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
let fs = require('fs-extra');
var randomstring = require("randomstring");
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

const DIR = "./dist/";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'audio/mp3') {
      var postId=randomstring.generate(3);
      let temp = './upload/audio/'+postId;
      fs.mkdirsSync(temp);
      cb(null, temp)
    } 
    else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      
      let temp = './upload/img/';
      fs.mkdirsSync(temp);
      cb(null, temp)
    }
    else if (file.mimetype === 'video/mp4') {
      var postId=randomstring.generate(3);
      let temp = './upload/video/'+postId;
      fs.mkdirsSync(temp);
      cb(null, temp)
    }else {
      console.log(file.mimetype)
      cb({ error: 'Mime type not supported' })
    }
   
    
  },
  filename: (req, file, cb) => {
    var postId=randomstring.generate(3);
    cb(null,postId+'_'+file.originalname);
  }
});
let upload1= multer({ storage: storage });

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
app.use(express.static(path.join(__dirname, "upload")));



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


app.post("/deleteFile", function (req, res) {
  console.log('File Url',req.body.filePath);
  if (req.body.filePath) {
    fs.unlink(req.body.filePath, (err) => {
      if (err) {
        console.log('error',err);
        return res.send({
          success: false
        });
      }else{
      console.log('File was deleted');
      return res.send({
        success: true
      });
    }
    });
  } else {    
    return res.send({
      success: false
    });
  }
});


app.post("/singleUpload", upload1.array("uploads[]", 12), function(req, res) {
  if (!req.files) {
    return res.send({
      success: false
    });
  } else {
    return res.send({
      success: true,
      files: req.files
    });
  }
});
app.post("/upload", upload1.array("uploads[]", 12), function(req, res) {
  if (!req.files) {
    return res.send({
      success: false
    });
  } else {
    return res.send({
      success: true,
      files: req.files
    });
  }
});
app.use("/api", apiRoutes);
app.use("/cms", cmsRoutes);
app.use("/auth", authRoutes);
app.use('/upload', express.static(path.join(__dirname, '/upload')));
app.use('/deleteFile', express.static(path.join(__dirname, '/upload')));

// Launch app to listen to specified port
app.listen(port, function() {
  console.log("Running RestHub on port " + port);
});
