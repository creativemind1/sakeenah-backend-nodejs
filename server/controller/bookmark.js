/**
 *@description favourite router
 */

'use strict';
const express = require('express'),
    router = express.Router(),
    bookmark = require('../services/bookmark');

router.post('/add', (req, res) => {
    console.log('REQ Add bookmark......');
    bookmark.add(req, obj => {
        console.log('RESPONSE Add bookmark......', obj);
        res.json(obj);
    });
});

router.post('/remove', (req, res) => {
    console.log('REQ remove bookmark......');
    bookmark.remove(req, obj => {
        console.log('RESPONSE remove bookmark......', obj);
        res.json(obj);
    });
});

router.post('/list', (req, res) => {
    console.log('REQ list of bookmarks......');
    bookmark.list(req, obj => {
        console.log('RESPONSE list of bookmarks(NO DATA because response could be big)');
        res.json(obj);
    });
});

module.exports = router;
