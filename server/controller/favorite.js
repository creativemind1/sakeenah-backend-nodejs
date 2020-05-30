/**
 *@description favourite router
 */

'use strict';
const express = require('express'),
    router = express.Router(),
    favorite = require('../services/favorite');

router.post('/list', (req, res) => {
    console.log('REQ ALL FAVORITES');
    favorite.allFavorites(req, obj => {
        res.json(obj);
    });
});

router.post('/add', (req, res) => {
    console.log('REQ Add FAVORITES');
    favorite.addFavorite(req, obj => {
        console.log('RESPONSE ADD FAVORITES', obj);
        res.json(obj);
    });
});

router.post('/remove', (req, res) => {
    console.log('REQ REMOVE FAVORITES');
    favorite.removeFavorite(req, obj => {
        console.log('RESPONSE REMOVE FAVORITES', obj);
        res.json(obj);
    });
});

module.exports = router;
