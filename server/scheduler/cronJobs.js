'use strict'
var payment = require('../services/payment')
var CronJob = require('cron').CronJob;

module.exports = {
    everyDayAt1030: () => {
        var job = new CronJob('27 11 * * *', () => {
            console.log('scheduler runs  at 10:30 am every day');
            payment.monitor()
        }, null, true);
        job.start();
    }
}