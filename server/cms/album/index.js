'use strict';
/**
 *@description CRUD on album
 */

const express = require('express'),
    router = express.Router(),
    AlbumModel = require('../../model/Album'),
    randomstring = require('randomstring');

router.post('/save', (req, res) => {
    if (req.body.albumId) {
        var modify_date = new Date();
        AlbumModel.findOneAndUpdate(
            { albumId: req.body.albumId },
            {
                title: req.body.title,
                modifiedBy: req.body.userId,
                modify_date: modify_date,
                categoryId: req.body.categoryId,
                description: req.body.description,
                thumbImageUrl: req.body.thumbImageUrl,
                authorImageUrl: req.body.authorImageUrl,
                narrator: req.body.narrator,
                author: req.body.author,
                videoUrl: req.body.videoUrl,
                premium: req.body.premium,
                active: req.body.active,
                duration: req.body.duration,
                sequence: req.body.sequence,
            },
            { upsert: false },
            function(err, doc) {
                if (doc) {
                    res.json({
                        status: 'SUCCESS',
                        message: 'Successfully Updated Media',
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
        var albumModel = new AlbumModel();
        albumModel.categoryId = req.body.categoryId;
        albumModel.albumId = randomstring.generate(10);
        albumModel.createdBy = req.body.userId;
        albumModel.companyId = req.body.companyId;
        albumModel.videoUrl = req.body.videoUrl;
        albumModel.title = req.body.title;
        albumModel.description = req.body.description;
        albumModel.thumbImageUrl = req.body.thumbImageUrl;
        albumModel.authorImageUrl = req.body.authorImageUrl;
        albumModel.mediaType = req.body.mediaType;
        albumModel.narrator = req.body.narrator;
        albumModel.author = req.body.author;
        albumModel.create_date = new Date();
        albumModel.premium = req.body.premium;
        albumModel.active = req.body.active;
        albumModel.duration = req.body.duration;
        albumModel.sequence = req.body.sequence;
        albumModel.save(function(error) {
            if (error) {
                res.json({
                    status: 'FAILED',
                    message: error,
                });
            } else {
                res.json({
                    status: 'SUCCESS',
                    message: 'Successfully Saved Media',
                });
            }
        });
    }
});

router.post('/list', (req, res) => {
    AlbumModel.find(null, function(err, doc) {
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

router.post('/delete', (req, res) => {
    if (req.body.albumId) {
        AlbumModel.deleteOne({ albumId: req.body.albumId }, function(err, doc) {
            if (doc && doc.deletedCount == 1) {
                res.json({
                    status: 'SUCCESS',
                    message: 'Successfully Deleted Media',
                });
            } else {
                res.json({
                    status: 'FAILED',
                    message: 'No Data Available',
                });
            }
        });
    } else {
        res.json({
            status: 'FAILED',
            message: 'albumId Id Missing in Request ',
        });
    }
});

module.exports = router;
