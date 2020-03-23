/**
 *@description audio router
 */

const express = require('express'),
    router = express.Router(),
    payment = require('../services/payment');

router.get('/orders', (req, res) => {
    payment.orders(req, obj => {
        res.json(obj);
    });
});
router.post('/capture', (req, res) => {
    payment.capture(req, obj => {
        res.json(obj);
    });
});

module.exports = router;
