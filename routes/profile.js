var express = require('express');
var app = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('classicmodels.sqlite',sqlite3.OPEN_READONLY);

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

app.get('/', (req, res) => {
    console.log(req.email)
});

module.exports = app;
