// FileName: index.js
// Import express
require('dotenv').config();
let express = require('express');
var multer = require('multer');
let bodyParser = require('body-parser');
let routes = require('./server/routes');
// Initialize the app
const app = express();
// Import Mongoose
//let mongoose = require("mongoose");
var config = require('./server/config/config-' + process.env.NODE_ENV + '.js');
const path = require('path');
var cors = require('cors');
var jwt = require('jsonwebtoken');
let fs = require('fs-extra');
var randomstring = require('randomstring');
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

var mongoose = require('mongoose');
mongoose.connect(config.dbUrl(), { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

/*
 * Configuring AWS For Uploading Image and mp3
 */
const AWS = require('aws-sdk');
const ID = 'AKIAITETVYAOCLETVZZA'; //client AWS API sakeenah
const SECRET = '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'; ////client AWS API sakeenah
const BUCKET_NAME = 'sakeenah';
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var postId = randomstring.generate(3);
        if (file.mimetype === 'audio/mp3') {
            let temp = './upload/audio/' + postId;
            fs.mkdirsSync(temp, { recursive: true }, err => {
                if (err) throw err;
            });
            cb(null, temp);
        } else if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png'
        ) {
            let temp = './upload/img/' + postId;
            fs.mkdirsSync(temp, { recursive: true }, err => {
                if (err) throw err;
            });
            cb(null, temp);
        } else if (file.mimetype === 'video/mp4' || file.mimetype === 'video/x-ms-wmv') {
            let temp = './upload/video/' + postId;
            fs.mkdirsSync(temp, { recursive: true }, err => {
                if (err) throw err;
            });
            // fs.mkdirsSync(temp);
            cb(null, temp);
        } else {
            console.log(file.mimetype);
            cb({ error: 'Mime type not supported' });
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
let upload1 = multer({ storage: storage });

// Configure bodyparser to handle post requests
app.use(cors());
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Accept');
    res.header('Access-Control-Allow-Methods');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.use(bodyParser.json());

function authChecker(req, res, next) {
    if (
        req.path.startsWith('/cms') ||
        (req.path.startsWith('/app') &&
            !req.path.startsWith('/app/user/login') &&
            !req.path.startsWith('/app/user/resetpswd') &&
            !req.path.startsWith('/app/user/resetPassword') &&
            !req.path.startsWith('/app/user/verifyEmail'))
    ) {
        jwt.verify(
            req.body.token,
            config.secret(),
            {
                expiresIn: '10d', // expires in 24 hours
            },
            (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid',
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
console.log(port, '===port==');
app.set('superSecret', config.secret()); // secret variable

app.post('/deleteFile', function (req, res) {
    console.log('File Url', req.body.filePath);
    if (req.body.filePath) {
        fs.unlink(req.body.filePath, err => {
            if (err) {
                console.log('error', err);
                return res.send({
                    success: false,
                });
            } else {
                console.log('File was deleted');
                return res.send({
                    success: true,
                });
            }
        });
    } else {
        return res.send({
            success: false,
        });
    }
});

app.get('/(|login|reset|category|album|playlist)', function (req, res) {
    res.set('Content-Type', 'text/html').sendFile(__dirname + '/public/index.html');
});

app.post('/singleUpload', upload1.array('uploads[]', 12), function (req, res) {
    const fileType = req.files[0];
    var filestream = fs.createReadStream(fileType.path);
    const makeid = () => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 3; i++) {
            result += characters.charAt(Math.floor(Math.random() * 3));
        }
        return result;
    };
    filestream.on('open', function () {
        const randomNumber = Math.random() * 10000;

        const randomChar = makeid() + randomNumber.toFixed(0);

        const keyMp3 = 'audios/' + randomChar + '.mp3';
        const keyImg = 'images/' + randomChar + '.png';
        const key = fileType.mimetype == 'audio/mp3' ? keyMp3 : keyImg;
        const params = {
            Bucket: BUCKET_NAME,
            Key: key,
            Body: filestream,
            ACL: 'public-read',
        };
        s3.upload(params, (err, data) => {
            if (err) throw err;
            var reqFrame = req.files;
            var audioPath = data.Location.split('/audios/');
            var newPath = data.Location.split('/images/');
            var status = newPath === true ? newPath[1] : audioPath[1];
            for (var i in reqFrame) {
                reqFrame[i].path = status;
            }
            console.log(`File uploaded successfully at ${data.Location}`);
            return res.send({
                success: true,
                files: reqFrame,
            });
        });
    });
});
app.post('/upload', upload1.array('uploads[]', 12), function (req, res) {
    console.log('---- Video ---', req.files);
    if (!req.files) {
        return res.send({
            success: false,
        });
    } else {
        return res.send({
            success: true,
            files: req.files,
        });
    }
});
var scheduler = require('./server/scheduler');
scheduler.init();
app.use('/upload', express.static(path.join(__dirname, '/upload')));
app.use('/deleteFile', express.static(path.join(__dirname, '/upload')));

//Initiallize Route
routes.initRoutes(app);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log('Running RestHub on port ' + port);
});
