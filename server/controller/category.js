/**
 *@description category router
 */
'use strict';
const express = require('express'),
    router = express.Router(),
    category = require('../services/category');

router.post('/list', (req, res) => {
    category.list(req, obj => {
        res.json(obj);
    });
});

module.exports = router;
