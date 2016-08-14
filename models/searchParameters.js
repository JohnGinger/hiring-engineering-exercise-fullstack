"use strict";
const moment = require('moment');

const validDateRangeOrNoDate = function (parameters) {
  let dateRangeSpecified = parameters.hasSince || parameters.hasUntil;
  if (!dateRangeSpecified) {
    return true;
  } else {
    return (!parameters.hasSince || parameters.since.isValid()) &&
      (!parameters.hasUntil || parameters.until.isValid()) &&
      (!(parameters.hasSince && parameters.hasUntil) || parameters.until > parameters.since);
  }
}

const validSensorId = function (sensorId) {
  return sensorId && typeof (sensorId) === 'string';
}

const validate = function (parameters) {
  return validSensorId(parameters.sensorId) &&
    validDateRangeOrNoDate(parameters);
}

const create = function (sensorId, since, until) {
  let parameters = {
    sensorId: sensorId,
    hasSince: since != undefined, // Using != undefined so it also tests against null
    since: moment(since, moment.ISO_8601, true),
    hasUntil: until != undefined,
    until: moment(until, moment.ISO_8601, true),
  }

  parameters.isValid = validate(parameters);

  // The searchParameters object should be immutable to force any manipulation of
  // it to happen here
  return Object.freeze(parameters)
}

module.exports = create;

