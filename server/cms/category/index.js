'use strict';
/**
 * @description CRUD on category
 */

const express = require('express'),
    router = express.Router(),
    Category = require('../../model/Category'),
    randomstring = require('randomstring');

router.post('/save', (req, res) => {
    var modify_date = new Date();
    if (req.body.categoryId) {
        Category.findOneAndUpdate(
            { categoryId: req.body.categoryId },
            {
                categoryName: req.body.categoryName,
                modifiedBy: req.body.userId,
                description: req.body.description,
                modify_date: modify_date,
                active: req.body.active,
            },
            { upsert: false },
            (err, doc) => {
                if (doc) {
                    res.json({
                        status: 'SUCCESS',
                        message: 'Successfully Updated Category',
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
        var categoryModel = new Category();
        categoryModel.categoryId = randomstring.generate(10);
        categoryModel.createdBy = req.body.userId;
        categoryModel.active = req.body.active;
        categoryModel.categoryName = req.body.categoryName;
        categoryModel.companyId = req.body.companyId;
        categoryModel.description = req.body.description;
        categoryModel.create_date = new Date();
        categoryModel.save(function(error) {
            if (error) {
                res.json({
                    status: 'FAILED',
                    message: error,
                });
            } else {
                res.json({
                    status: 'SUCCESS',
                    message: 'Successfully Category Saved',
                });
            }
        });
    }
});

router.post('/list', (req, res) => {
    Category.find(null, function(err, doc) {
        if (doc) {
            doc.sort((a, b) => a.sequence - b.sequence);
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
    if (req.body.categoryId) {
        Category.deleteOne({ categoryId: req.body.categoryId }, function(err, doc) {
            if (doc && doc.deletedCount == 1) {
                res.json({
                    status: 'SUCCESS',
                    message: 'Successfully Deleted Category',
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
            message: 'Category Id Missing in Request ',
        });
    }
});

module.exports = router;
