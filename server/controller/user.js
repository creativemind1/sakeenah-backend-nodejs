/**
 *@description user router
 */
'use strict';
const express = require('express'),
    router = express.Router(),
    user = require('../services/user'),
    fs = require('fs');

router.post('/login', (req, res) => {
    console.log('REQ_USER LOGINING......', req.body && req.body.emailId);
    user.login(req, obj => {
        console.log('RESPONSE LOGINING......');
        res.json(obj);
    });
});

router.post('/login1', (req, res) => {
    console.log('REQ_USER REGISTERING......');
    user.signup(req, obj => {
        console.log('RESPONSE REGISTERING......');
        res.json(obj);
    });
});

router.post('/resetpswd', (req, res) => {
    console.log('REQ_USER RESET PASSWORD......');
    user.resetpswd(req, obj => {
        console.log('RESPONSE RESET PASSWORD......', obj);
        res.json(obj);
    });
});

router.get('/verifyEmail', (req, res) => {
    console.log('REQ_USER VERIFY EMAIL......');
    user.verifyEmail(req, obj => {
        console.log('RESPONSE VERIFY EMAIL......', obj);
        if (obj.status == 'SUCCESS') {
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            fs.readFile('./server/template/thanks.html', null, function (error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write('Whoops! File not found!');
                } else {
                    res.write(data);
                }
                res.end();
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            fs.readFile('./server/template/error.html', null, function (error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write('Whoops! File not found!');
                } else {
                    res.write(data);
                }
                res.end();
            });
        }
        //res.json(obj);
    });
});

router.get('/resetPassword', (req, res) => {
    console.log('REQ_USER RESET PASSWORD......');
    user.resetPassword(req, obj => {
        console.log('RESPONSE RESET PASSWORD......', obj);
        if (obj.status == 'SUCCESS') {
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            fs.readFile('./server/template/thanks-reset.html', null, function (error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write('Whoops! File not found!');
                } else {
                    res.write(data);
                }
                res.end();
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            fs.readFile('./server/template/error.html', null, function (error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write('Whoops! File not found!');
                } else {
                    res.write(data);
                }
                res.end();
            });
        }
        //res.json(obj);
    });
});

router.post('/updateProfile', (req, res) => {
    console.log('REQ_USER UPDATE PROFILE');
    user.saveUserProfile(req, obj => {
        console.log('RESPONSE UPDATE PROFILE', obj);
        res.json(obj);
    });
});

module.exports = router;
