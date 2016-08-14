"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const searchParameters = require('./searchParameters');

app.get('/data', function (req, res) {
  let search = searchParameters(req.query.sensorId, 
    req.query.since,
    req.query.until
  )

  if (search.isValid) {
    res.send(search)
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