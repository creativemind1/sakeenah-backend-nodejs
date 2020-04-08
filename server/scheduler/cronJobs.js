'use strict';
var apple = require('../services/apple')
var CronJob = require('cron').CronJob;

module.exports = {
    everyDayAt1030: () => {
        var job = new CronJob('0 0 * * *', () => {
            console.log(new Date(), '************** scheduler runs ******************');
            apple.monitor();
        }, null, true);
        job.start();
    }
}