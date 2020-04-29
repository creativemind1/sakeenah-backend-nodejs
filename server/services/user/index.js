/**
 *@description category router
 */
'use strict';
const UserProfileModel = require('../../model/UserProfileModel'),
    randomstring = require('randomstring'),
    async = require('async'),
    bcrypt = require('bcrypt-nodejs'),
    email = require('../../helper/email'),
    fs = require('fs'),
    handlebars = require('handlebars'),
    webService = require('../../config/webservice'),
    webUrl = webService.webUrl(),
    jwt = require('jsonwebtoken'),
    config = require('../../config/config-' + process.env.NODE_ENV + '.js');

module.exports = {
    login: (req, callback) => {
        console.log(
            '=============== This is',
            process.env.NODE_ENV,
            'Branch ================================='
        );
        if (req.body.emailId && req.body.password) {
            UserProfileModel.findOne(
                { emailId: req.body.emailId, type: req.body.type, active: true },
                function (err, doc) {
                    if (doc && doc.password) {
                        if (bcrypt.compareSync(req.body.password, doc.password)) {
                            // Payment is Done .Its a premium User
                            const payload = { emailId: req.body.emailId };
                            var token = jwt.sign(payload, config.secret(), {
                                expiresIn: '365d', // expires in 4 days
                            });
                            if (doc.premiumUser) {
                                doc.freeTrial = true;
                                callback({
                                    status: 'SUCCESS',
                                    message: doc,
                                    token: token,
                                });
                            } else {
                                //validating the free trial period
                                var currentdate = new Date();
                                var logindate = doc.create_date;
                                // time difference
                                var timeDiff = Math.abs(
                                    logindate.getTime() - currentdate.getTime()
                                );
                                // days difference
                                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                doc.freeTrial = true;
                                if (diffDays < 8888888888888888888) {
                                    callback({
                                        status: 'SUCCESS',
                                        message: doc,
                                        token: token,
                                    });
                                } else {
                                    doc.freeTrial = false;
                                    callback({
                                        status: 'FAILED',
                                        message: 'Expired 7 Day Free Trial',
                                    });
                                }
                            }
                        } else {
                            callback({
                                status: 'FAILED',
                                message: 'PASSWORD NOT MATCHING',
                            });
                        }
                    } else {
                        callback({
                            status: 'FAILED',
                            message: 'No Data Available',
                        });
                    }
                }
            );
        } else {
            callback({
                status: 'FAILED',
                message: 'Provide Valid Credentials',
            });
        }
    },

    signup: (req, callback) => {
        var userProfileModel = new UserProfileModel();
        var firstName = req.body.firstName;
        userProfileModel.firstName = firstName;
        userProfileModel.emailId = req.body.emailId;
        userProfileModel.type = req.body.type;
        var userId = randomstring.generate(10);
        var content;
        console.log(
            '=============== This is',
            process.env.NODE_ENV,
            'Branch ================================='
        );
        let validateLoginData = nCallback => {
            if (req.body.emailId) {
                UserProfileModel.findOne(
                    { emailId: req.body.emailId, type: req.body.type },
                    function (err, doc) {
                        if (doc) {
                            // Already same email id exists
                            callback({
                                status: 'FAILED',
                                message: 'Email Id exists',
                            });
                        } else {
                            // Continue to register
                            return nCallback();
                        }
                    }
                );
            } else {
                return nCallback();
            }
        };

        let createHashPassword = nCallback => {
            if (req.body.pswd) {
                userProfileModel.password = bcrypt.hashSync(
                    req.body.pswd,
                    bcrypt.genSaltSync(8),
                    null
                );
                return nCallback();
            } else {
                return nCallback();
            }
        };

        let readContent = nCallback => {
            fs.readFile('./server/template/verifyEmail.html', 'utf8', function (err, data) {
                if (err) {
                    return nCallback();
                } else {
                    var template = handlebars.compile(data);
                    var verfiyEmail = webUrl.verfiyEmail + userId;
                    var replacements = {
                        firstName: firstName,
                        userlink: verfiyEmail,
                    };
                    var htmlToSend = template(replacements);
                    content = htmlToSend;
                    return nCallback();
                }
            });
        };

        if (req.body.socialMedia) {
            // validate the social media use cases
            if (req.body.emailId) {
                UserProfileModel.findOneAndUpdate(
                    { emailId: req.body.emailId, type: 'B2C' },
                    { socialMedia: true, active: true },
                    { upsert: false },
                    function (err, doc) {
                        if (err) {
                            callback({
                                status: 'FAILED',
                                message: err,
                            });
                        } else {
                            if (doc) {
                                // This is the use case for logged in .
                                //Generate Token
                                const payload = { emailId: req.body.emailId };
                                var token = jwt.sign(payload, config.secret(), {
                                    expiresIn: '365d', // expires in 24 hours
                                });
                                if (doc.premiumUser) {
                                    doc.freeTrial = true;
                                    callback({
                                        status: 'SUCCESS',
                                        message: doc,
                                        token: token,
                                    });
                                } else {
                                    //validating the free trial period
                                    var currentdate = new Date();
                                    var logindate = doc.create_date;
                                    // time difference
                                    var timeDiff = Math.abs(
                                        logindate.getTime() - currentdate.getTime()
                                    );
                                    // days difference
                                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                    doc.freeTrial = true;
                                    if (diffDays < 888888888888888888) {
                                        callback({
                                            status: 'SUCCESS',
                                            message: doc,
                                            token: token,
                                        });
                                    } else {
                                        doc.freeTrial = false;
                                        callback({
                                            status: 'FAILED',
                                            message: 'Expired 7 Day Free Trial',
                                        });
                                    }
                                }
                            } else {
                                // Continue to register
                                let response = {};
                                userProfileModel.userId = userId;
                                userProfileModel.create_date = new Date();
                                userProfileModel.socialMedia = true;
                                userProfileModel.active = true;
                                userProfileModel.firstName = req.body.firstName;
                                userProfileModel.socialMedia = true;
                                userProfileModel.type = 'B2C';

                                userProfileModel.password = bcrypt.hashSync(
                                    userId,
                                    bcrypt.genSaltSync(8),
                                    null
                                );

                                response = userProfileModel;

                                userProfileModel.save(error => {
                                    if (error) {
                                        callback({
                                            status: 'FAILED',
                                            message: error,
                                        });
                                    } else {
                                        //Generate Token
                                        const payload = { emailId: req.body.emailId };
                                        var token = jwt.sign(payload, config.secret(), {
                                            expiresIn: '365d', // expires in 24 hours
                                        });
                                        callback({
                                            status: 'SUCCESS',
                                            message: response,
                                            token,
                                        });
                                    }
                                });
                            }
                        }
                    }
                );
            } else {
                callback({
                    status: 'FAILED',
                    message: 'Request is not proper',
                });
            }
        } else {
            async.series(
                [validateLoginData.bind(), createHashPassword.bind(), readContent.bind()],
                function (err) {
                    if (err) {
                        callback({
                            status: 'FAILED',
                            message: err,
                        });
                    } else {
                        userProfileModel.userId = userId;
                        userProfileModel.create_date = new Date();
                        userProfileModel.save(function (error) {
                            if (error) {
                                callback({
                                    status: 'FAILED',
                                    message: error,
                                });
                            } else {
                                // send email
                                var emailObj = {
                                    html: content,
                                    recipientEmail: req.body.emailId,
                                    subject: 'Verification Email for Sakeenah /tranquility/ app',
                                    message: userId,
                                };
                                email.sendmail(emailObj, function (err, data) {
                                    if (err) console.log('----mail not sent-----' + err);
                                    else {
                                        console.log('----mail sent-----' + data);
                                    }
                                });
                                callback({
                                    status: 'SUCCESS',
                                    message: 'Successfully registered',
                                });
                            }
                        });
                    }
                }
            );
        }
    },

    resetpswd: (req, callback) => {
        var userId;
        var content;
        var firstName;
        UserProfileModel.findOne(
            {
                emailId: req.body.emailId,
                type: req.body.type,
            },
            function (err, doc) {
                if (doc) {
                    userId = doc.userId;
                    firstName = doc.firstName;
                    doc.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
                    //Again the customer needs to activate the link from email
                    //doc.active = false;
                    doc.save(function (error) {
                        if (error) {
                            callback({
                                status: 'FAILED',
                                message: error,
                            });
                        } else {
                            async.series([readContent.bind()], function (err) {
                                if (err) {
                                    callback({
                                        status: 'FAILED',
                                        message: err,
                                    });
                                } else {
                                    // send email
                                    var emailObj = {
                                        html: content,
                                        recipientEmail: req.body.emailId,
                                        subject: 'Reset Password Verificaton Email',
                                        message: userId,
                                        type: 'RESET_PASSWORD',
                                    };
                                    email.sendmail(emailObj, function (err, data) {
                                        if (err) console.log('----mail not sent-----' + err);
                                        else {
                                            console.log('----mail sent-----' + data);
                                        }
                                    });
                                    callback({
                                        status: 'SUCCESS',
                                        message: 'Successfully Updated Password',
                                    });
                                }
                            });
                        }
                    });
                } else {
                    callback({
                        status: 'FAILED',
                        message: 'No Data Available',
                    });
                }
            }
        );

        let readContent = nCallback => {
            fs.readFile('./server/template/resetPassword.html', 'utf8', function (err, data) {
                if (err) {
                    return nCallback();
                } else {
                    console.log('reset email hitting.........');
                    var template = handlebars.compile(data);
                    var verfiyEmail = webUrl.resetPassword + userId;
                    var replacements = {
                        firstName: firstName,
                        userlink: verfiyEmail,
                    };
                    var htmlToSend = template(replacements);
                    content = htmlToSend;
                    return nCallback();
                }
            });
        };
    },

    verifyEmail: (req, callback) => {
        var reqParams = req.query;
        console;
        if (reqParams && reqParams.userId) {
            UserProfileModel.findOneAndUpdate(
                { userId: reqParams.userId },
                { active: true },
                { upsert: false },
                function (err, doc) {
                    if (doc) {
                        callback({
                            status: 'SUCCESS',
                            doc,
                        });
                    } else {
                        callback({
                            status: 'ERROR',
                            doc,
                        });
                    }
                }
            );
        } else {
            callback({
                status: 'FAILED',
                message: 'User Id Matching Failed',
            });
        }
    },

    resetPassword: (req, callback) => {
        var reqParams = req.query;
        console;
        if (reqParams && reqParams.userId) {
            UserProfileModel.findOneAndUpdate(
                { userId: reqParams.userId },
                { active: true },
                { upsert: false },
                function (err, doc) {
                    if (doc) {
                        callback({
                            status: 'SUCCESS',
                            doc,
                        });
                    } else {
                        callback({
                            status: 'ERROR',
                            doc,
                        });
                    }
                }
            );
        } else {
            callback({
                status: 'FAILED',
                message: 'User Id Matching Failed',
            });
        }
    },

    getUserProfile: (req, callback) => {
        if (req.body.userId) {
            let aggregatorData = [
                // Stage 1
                {
                    $match: {
                        userId: req.body.userId,
                    },
                },

                // Stage 2
                {
                    $project: {
                        userId: 1,
                        _id: 0,
                        emailId: 1,
                        type: 1,
                        firstName: 1,
                        age: 1,
                        country: 1,
                        profileUrl: 1,
                        gender: 1,
                    },
                },
            ];

            UserProfileModel.aggregate(aggregatorData, function (err, data) {
                if (err) {
                    callback({
                        status: 'FAILED',
                        message: err,
                    });
                } else {
                    callback({
                        status: 'SUCCESS',
                        message: data,
                    });
                }
            });
        } else {
            callback({
                status: 'FAILED',
                message: 'User Id Not available in Request',
            });
        }
    },

    saveUserProfile: (req, callback) => {
        if (req.body.userId) {
            UserProfileModel.findOneAndUpdate(
                { userId: req.body.userId },
                {
                    $set: {
                        firstName: req.body.firstName,
                        emailId: req.body.emailId,
                        age: req.body.age,
                        country: req.body.country,
                        profileUrl: req.body.profileUrl,
                        gender: req.body.gender,
                    },
                },
                { new: true, upsert: false },
                function (err, data) {
                    if (err) {
                        callback({
                            status: 'FAILED',
                            message: err,
                        });
                    } else {
                        callback({
                            status: 'SUCCESS',
                            message: data,
                        });
                    }
                }
            );
        }
    },
};
