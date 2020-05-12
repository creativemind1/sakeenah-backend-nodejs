/**
 *@description favourite router
 */

'use strict';
const express = require('express'),
    router = express.Router(),
    bookmark = require('../services/bookmark');

router.post('/add', (req, res) => {
    bookmark.add(req, obj => {
        res.json(obj);
    });
});

router.post('/remove', (req, res) => {
    bookmark.remove(req, obj => {
        res.json(obj);
    });
});

router.post('/list', (req, res) => {
    bookmark.list(req, obj => {
        res.json(obj);
    });
});

module.exports = router;
