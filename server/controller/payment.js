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
    console.log('REQ iOS payment capture');
    payment.capture(req, obj => {
        console.log('RESPONSE iOS payment capture', obj);
        res.json(obj);
    });
});

router.post('/android_capture', (req, res) => {
    console.log('REQ ANDROID payment capture');
    payment.android_capture(req, obj => {
        console.log('RESPONSE ANDROID payment capture', obj);
        res.json(obj);
    });
});

router.post('/recentPurchase', (req, res) => {
    console.log('REQ Checking recent purchase');
    payment.recentPurchase(req, obj => {
        console.log('RESPONSE recent purchase', obj);
        res.json(obj);
    });
});

module.exports = router;
