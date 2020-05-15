const express = require('express'),
    router = express.Router(),
    apple = require('../services/apple');

router.post('/verifyReceipt', (req, res) => {
    apple.verifyReceipt(req, obj => {
        res.json(obj);
    });
});

module.exports = router;
