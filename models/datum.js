"use strict";
const moment = require('moment');

const validSensorId = function (sensorId) {
    return (sensorId != undefined) && // Using != undefined so it also tests against null
        typeof sensorId === 'string'
}

const validTime = function (time) {
    return (time != undefined) &&
        moment.unix(time).isValid()
}

const validValue = function (value) {
    return (value != undefined) &&
        !isNaN(parseFloat(value))
}


const validate = function (parameters) {
    return validSensorId(parameters.sensorId) &&
        validTime(parameters.time) &&
        validValue(parameters.value);
}

const create = function (sensorId, time, value) {
    let parameters = {
        sensorId: sensorId,
        time: time,
        value: value,
    }

    parameters.isValid = validate(parameters);
    parameters.time = moment.unix(parameters.time).toISOString()
    // The datum object should be immutable to force any manipulation of
    // it to happen here
    return Object.freeze(parameters)
}

module.exports = create;

