'use strict';
/**
 * @description apple services
 */
let UserProfile = require('../../model/UserProfileModel'),
    AndroidPayReceipts = require('../../model/AndroidPayReceipts'),
    async = require('async'),
    moment = require('moment'),
    axios = require('axios'),
    config = require('../../config/config-' + process.env.NODE_ENV + '.js');

module.exports = {
    verifyReceipt: (req, callback) => {
        let responseObj = { status: 'FAILED', message: null };
        let today = Number(moment().format('x'));
        var activeReceipt = null;
        let receiptStatus = false;
        let newReceipt = false;
        let unknownReceipt = false;
        var transaction_receipt = null;
        let access_token;

        /** get the active receipts which expires today */
        let getActiveReceipt = n => {
            AndroidPayReceipts.findOne(
                {
                    userId: req.body.userId,
                    active: true,
                },
                (e, receipt) => {
                    if (receipt) {
                        console.log(req.body.userId + ' don`t Active Receipts');
                        activeReceipt = receipt;
                    }
                    return n();
                }
            );
        };

        /** Generating access token from refresh_token */
        let activateToken = n => {
            if (activeReceipt) {
                console.log('REQUESTING FOR ACCESS TOKEN FOR GOOGLE RECEIPT');
                axios({
                    method: 'post',
                    url: config.webUrl().googleAPI.token_url,
                    data: {
                        grant_type: 'refresh_token',
                        refresh_token: config.webUrl().googleAPI.refresh_token,
                        client_id: config.webUrl().googleAPI.client_id,
                        client_secret: config.webUrl().googleAPI.client_secret,
                    },
                })
                    .then(function (response) {
                        if (response && response.data.access_token) {
                            console.log('New Access_token generated!!!');
                            access_token = response.data.access_token;
                            return n();
                        } else {
                            console.log('Access token response not proper');
                            responseObj.status = 'FAILED';
                            responseObj.message = 'token not generated properly';
                            callback(responseObj);
                        }
                    })
                    .catch(function (err) {
                        console.log('== Access_token catch error ==');
                        if (err) {
                            console.log('catch error', err);
                        }
                        return n();
                    });
            } else {
                console.log('No Active Receipt Available!');
                return n();
            }
        };

        // Verifying the active receipt by sending access_token
        let veriyReceipts = n => {
            if (activeReceipt && access_token) {
                // JSON.parse(receipt.receiptLog)
                transaction_receipt = JSON.parse(activeReceipt.receiptLog);
                let args = {
                    receipt_key: activeReceipt.receipt_key,
                    userId: req.body.userId,
                };
                //https://www.googleapis.com/androidpublisher/v3/applications/com.sakeenah.sakeenah/purchases/subscriptions/sakeenah/tokens/kechlmkbkobgpplbihdpglfp.AO-J1OwSDlDhSek2-SEmlXpUvh2IfxaxyWwAMHlTqLw4VQW7yFgPk59BPUfLe8-akyMONVXNsYlMgXbTIwn2-OX2wcUkfLQGdsCicUdOP2m-uTQSeY5pMNA/?access_token=ya29.a0Ae4lvC3T1wA1mV75NLEVRtXxAR_cjiwaF5y7k6bS47EcO8gcYaywNmS6IiKXoNfV9BgZCiMMbNEq1O4BGrNNYg8c2_C3rc4bCfRHPsCoSLZT28b-n0f4DUIOrIR-N-iDVpd2rkWsA2AklbTw77o10dfRovG1R9nNVN3X
                const url =
                    config.webUrl().googleAPI.verify_receipt +
                    config.webUrl().googleAPI.packageName +
                    '/' +
                    'purchases/subscriptions/' +
                    config.webUrl().googleAPI.subscriptionId +
                    '/tokens/' +
                    args.receipt_key +
                    '/?access_token=' +
                    access_token;
                //https://www.googleapis.com/androidpublisher/v3/applications/com.sakeenah.sakeenah/purchases/subscriptions/sakeenah/tokens/undefined/?access_token=ya29.a0Ae4lvC30F7n_RmUVBWsSDl-SCc92gy-UV0Q4VU15m0O7AKqnJzslRbRDGngm69-LRkkECkvMJnUkmK9bXTdJ0Pi7fl3e_tWSgBwymz_L4hosaTbD7ajzWu4cqtXca3T8homv5qQpkRe17bd1wiGeU5BRMWWU9rqUzZT4
                axios
                    .get(url)
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        if (response && response.data) {
                            let latestReciptInfo = response.data;
                            if (latestReciptInfo.orderId == activeReceipt.transaction_id) {
                                // If Same receipt
                                if (Number(latestReciptInfo.expiryTimeMillis) > today) {
                                    console.log('..RECEIPT STILL VALID...');
                                    // If Receipt is still valid
                                    receiptStatus = true;
                                    return n();
                                } else {
                                    // If Receipt got expired or cancelled or not renewed;
                                    console.log('..RECEIPT NOT VALID! EXPIRED (OR) CANCELLED...');
                                    unknownReceipt = true;
                                    let filter = { userId: req.body.userId };
                                    UserProfile.updateOne(
                                        filter,
                                        { $set: { premiumUser: false } },
                                        () => {
                                            return n();
                                        }
                                    );
                                }
                            } else {
                                if (Number(latestReciptInfo.expiryTimeMillis) > today) {
                                    console.log('..New Receipt generated...');
                                    // New Receipt generated and subscription is not yet expired or cancelled
                                    receiptStatus = true;
                                    let doc = {
                                        userId: args.userId,
                                        transaction_id: latestReciptInfo.orderId,
                                        purchase_date_ms: latestReciptInfo.startTimeMillis,
                                        expires_date_ms: latestReciptInfo.expiryTimeMillis,
                                        receipt_key: args.receipt_key,
                                        active: true,
                                        receiptLog: JSON.stringify(latestReciptInfo),
                                    };
                                    AndroidPayReceipts(doc).save(() => {
                                        responseObj.status = 'SUCCESS';
                                        newReceipt = true;
                                        return n();
                                    });
                                } else {
                                    console.log(
                                        '..ACTIVE:false to old receipt as new receipt found...'
                                    );
                                    // Last checked receipt is expired and the user has not renewed
                                    unknownReceipt = true;
                                    let filter = { userId: req.body.userId };
                                    UserProfile.updateOne(
                                        filter,
                                        { $set: { premiumUser: false } },
                                        () => {
                                            return n();
                                        }
                                    );
                                }
                            }
                            //todo
                            //cancellation check
                        } else {
                            return n();
                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                        return n();
                    });
            } else {
                callback(responseObj);
            }
        };

        //Deactivation the previous receipt if user got new receipt or cancelled the previous
        let updateReceipts = n => {
            if (newReceipt || unknownReceipt) {
                AndroidPayReceipts.updateMany(
                    {
                        transaction_id: transaction_receipt.orderId || activeReceipt.transaction_id,
                    },
                    { $set: { active: false } },
                    () => {
                        return n();
                    }
                );
            } else {
                return n();
            }
        };

        async.series(
            [
                getActiveReceipt.bind(),
                activateToken.bind(),
                veriyReceipts.bind(),
                updateReceipts.bind(),
            ],
            err => {
                console.log(err, '==VERIFYRECEIPT ANDROID THROWING ERROR IN CATCH(E)');
                if (receiptStatus) {
                    responseObj.status = 'SUCCESS';
                }
                callback(responseObj);
            }
        );
    },
};
