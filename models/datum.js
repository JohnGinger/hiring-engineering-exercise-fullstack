"use strict";
const moment = require('moment');

const validSensorId = function(sensorId){
  return (sensorId != undefined) &&
          typeof sensorId === 'string'
}

const validTime = function(time){
  return (time != undefined) &&
          moment(time).isValid()
}

const validValue = function(value){
  return (value != undefined) &&
      !isNaN(parseFloat(value))
}


var validate = function (parameters){
  return validSensorId(parameters.sensorId) &&
    validTime(parameters.time) &&
    validValue(parameters.value);
}

var create = function(sensorId, time, value){
    let parameters = {
        sensorId : sensorId,
        time : time,
        value : value
    }

    parameters.isValid = validate(parameters);
    parameters.time = moment.unix(parameters.time).toISOString()    
    // The datum object should be immutable to force any manipulation of
    // it to happen here
    return Object.freeze(parameters)
}

module.exports = create;

