'use strict';
const appRouter = require('./appRouter'),
    cmsRouter = require('./cmsRouter');
    //authRouter = require('./authRouter');
module.exports.initRoutes = function(app) {
    app.use('/app', appRouter);
    app.use('/cms', cmsRouter);
    //app.use('/auth', authRouter);
    app.use('/echo', (req, res) => {
        res.send('Get relaxe with Sakeenah');
    });
};
