"use strict";

const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const app = express();

const validDateRangeOrNoDate = function (since, until) {
  let dateRangeSpecified = since || until;
  if (!dateRangeSpecified) {
    return true;
  } else {
    let sinceDate = moment(since, moment.ISO_8601, true);
    let untilDate = moment(until, moment.ISO_8601, true);
    return (!since || sinceDate.isValid()) &&
      (!until || untilDate.isValid()) &&
      (!(since && until) || untilDate > sinceDate);
  }
}

const isWellFormedGetRequest = function (req) {
  return req.query.sensorId &&
    validDateRangeOrNoDate(req.query.since, req.query.until);
}

app.get('/data', function (req, res) {
  if (isWellFormedGetRequest(req)) {
    res.send('OK')
  } else {
    res.status(400).send();
  }
});

const isWellFormedPutRequest = function (req) {
  let body = req.body;
  return body.time && body.value && body.sensorId
}

app.put('/data', bodyParser.json(), function (req, res) {
  if (isWellFormedPutRequest(req)) {
    let body = req.body;
    res.status(204).send();
  } else {
    res.status(400).send();
  }
});

module.exports = () => app;