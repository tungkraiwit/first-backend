var express = require('express');
var app = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('classicmodels.sqlite',sqlite3.OPEN_READONLY);

app.get('/', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    res.send(rows);
  });
});

module.exports = app;
