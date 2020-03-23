/**
 *@description user router
 */
'use strict';
const express = require('express'),
    router = express.Router(),
    user = require('../services/user');

router.post('/login', (req, res) => {
    user.login(req, obj => {
        res.json(obj);
    });
});

router.post('/signup', (req, res) => {
    user.signup(req, obj => {
        res.json(obj);
    });
});

router.post('/resetpswd', (req, res) => {
    user.resetpswd(req, obj => {
        res.json(obj);
    });
});

router.post('/verifyEmail', (req, res) => {
    user.verifyEmail(req, obj => {
        res.json(obj);
    });
});

router.post('/resetPassword', (req, res) => {
    user.resetPassword(req, obj => {
        res.json(obj);
    });
});

module.exports = router;
