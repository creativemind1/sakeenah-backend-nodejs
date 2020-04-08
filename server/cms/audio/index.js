'use strict';
/**
 * @description CRUD on audio
 */

const express = require('express'),
    router = express.Router(),
    AudioModel = require('../../model/Audio'),
    randomstring = require('randomstring');

router.post('/save', (req, res) => {
    if (req.body.audioId) {
        var modify_date = new Date();
        AudioModel.findOneAndUpdate(
            { audioId: req.body.audioId },
            {
                name: req.body.name,
                modifiedBy: req.body.userId,
                modify_date: modify_date,
                description: req.body.description,
                albumId: req.body.albumId,
                premium: req.body.premium,
                sequence: req.body.sequence,
                thumbImageUrl: req.body.thumbImageUrl,
            },
            { upsert: false },
            function (err, doc) {
                if (doc) {
                    res.json({
                        status: 'SUCCESS',
                        message: 'Successfully Updated PlayList',
                    });
                } else {
                    res.json({
                        status: 'FAILED',
                        message: err,
                    });
                }
            }
        );
    } else {
        var playListModel = new AudioModel();
        playListModel.albumId = req.body.albumId;
        playListModel.audioId = randomstring.generate(10);
        playListModel.createdBy = req.body.userId;
        playListModel.premium = req.body.premium;
        playListModel.name = req.body.name;
        playListModel.authorBy = req.body.authorBy;
        playListModel.create_date = new Date();
        playListModel.description = req.body.description;
        playListModel.companyId = req.body.companyId;
        playListModel.sequence = req.body.sequence;
        playListModel.thumbImageUrl = req.body.thumbImageUrl;
        playListModel.save(function (error) {
            if (error) {
                res.json({
                    status: 'FAILED',
                    message: error,
                });
            } else {
                res.json({
                    status: 'SUCCESS',
                    message: 'Successfully Saved PlayList ',
                });
            }
        });
    }
});

router.post('/list', (req, res) => {
    AudioModel.find(null, function (err, doc) {
        if (doc) {
            res.json({
                status: 'SUCCESS',
                message: doc,
            });
        } else {
            res.json({
                status: 'FAILED',
                message: 'No Data Available',
            });
        }
    });
});

module.exports = router;
