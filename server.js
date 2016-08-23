"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const SearchParametersModel = require('./models/searchParameters');
const DatumModel = require('./models/datum');
const db = require('./db');

app.get('/data', function (req, res) {
  const search = SearchParametersModel(req.query.sensorId,
    req.query.since,
    req.query.until
  )

  if (search.isValid) {
    db.get(search).then(data => {
      if (data.length === 0) {
        res.status(404).send()
      } else {
        res.send(data)
      }
    }).catch(error => {
      console.log(error)
      res.status(500).send()
    }
      )
  } else {
    res.status(400).send();
  }
});

app.put('/data', bodyParser.json(), function (req, res) {
  const datum = DatumModel(req.body.sensorId, req.body.time, req.body.value);

  if (datum.isValid) {
    db.insert(datum).then(() => {
      res.status(204).send();
    }).catch(error => {
      if (error.code === '23505') {
        // Unique constraint failed (see https://www.postgresql.org/docs/9.3/static/errcodes-appendix.html)
        res.status(409).send();
      } else {
        console.log(error);
        res.status(500).send();
      }
    })
  } else {
    res.status(400).send();
  }
});

module.exports = () => app;