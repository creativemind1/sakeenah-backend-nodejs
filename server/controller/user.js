/**
 *@description user router
 */
'use strict';
const express = require('express'),
    router = express.Router(),
    user = require('../services/user'),
    fs = require('fs');

router.post('/login', (req, res) => {
    user.login(req, obj => {
        res.json(obj);
    });
});

router.post('/login1', (req, res) => {
    user.signup(req, obj => {
        res.json(obj);
    });
});

router.post('/resetpswd', (req, res) => {
    user.resetpswd(req, obj => {
        res.json(obj);
    });
});

router.get('/verifyEmail', (req, res) => {
    user.verifyEmail(req, obj => {
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
    user.resetPassword(req, obj => {
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
    user.saveUserProfile(req, obj => {
        res.json(obj);
    });
});

module.exports = router;
