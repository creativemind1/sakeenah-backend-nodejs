const express = require('express'),
    router = express.Router(),
    android = require('../services/android');

router.post('/verifyReceipt', (req, res) => {
    android.verifyReceipt(req, obj => {
        res.json(obj);
    });
});

module.exports = router;
