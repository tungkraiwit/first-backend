var express = require('express');
var app = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('classicmodels.sqlite',sqlite3.OPEN_READONLY);

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

app.get('/', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT *  FROM customers', (err, rows) => {
    // console.log(rows);
    // const allUsernames = rows.map(e => e.email);
    // console.log(allUsernames);
    res.send(rows);
  });
});

module.exports = app;
