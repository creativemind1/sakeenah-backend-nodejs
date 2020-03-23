'use strict'
let cronJobs = require('./cronJobs')
module.exports = {
    init: () => {
        cronJobs.everyDayAt1030()
    }
}