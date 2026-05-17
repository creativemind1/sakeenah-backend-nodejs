exports.webUrl = function () {
    var url = 'https://cms-v2.sakeenah.io';
    return {
        resetPassword: url + '/app/user/resetPassword?userId=',
        verfiyEmail: url + '/app/user/verifyEmail?userId=',
        baseUrl: url,
        appleURL: 'https://buy.itunes.apple.com/verifyReceipt',
        applePassword: process.env.APPLE_PASSWORD,
        googleAPI: {
            token_url: 'https://accounts.google.com/o/oauth2/token',
            verify_receipt: 'https://www.googleapis.com/androidpublisher/v3/applications/',
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            packageName: 'com.sakeenah.sakeenah',
            subscriptionId: 'sakeenah',
        },
    };
};
exports.dbUrl = function () {
    return process.env.MONGODB_URI;
};
exports.secret = function () {
    return process.env.JWT_SECRET;
};
