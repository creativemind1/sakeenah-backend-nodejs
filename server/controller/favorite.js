/**
 *@description favourite router
 */

'use strict';
const express = require('express'),
    router = express.Router(),
    favorite = require('../services/favorite');

router.post('/list', (req, res) => {
    favorite.allFavorites(req, obj => {
        res.json(obj);
    });
});

router.post('/add', (req, res) => {
    favorite.addFavorite(req, obj => {
        res.json(obj);
    });
});

router.post('/remove', (req, res) => {
    favorite.removeFavorite(req, obj => {
        res.json(obj);
    });
});

module.exports = router;
