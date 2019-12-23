var express = require('express');
var app = express.Router();
var session = require('express-session');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./classicmodels.sqlite', sqlite3.OPEN_READWRITE);

app.get('/', (req, res) => {
  // if (!session.user) return res.status(401).send('Not login..')
  db.all('SELECT * FROM employees', (err, rows) => {
    res.send(rows);
  });
});

app.post('/', (req, res) => {
  const { data, type } = req.body
  const { employee_number, job_title } = data
  // console.log(employee_number+'      '+job_title)
  console.log(job_title)
  db.all(`UPDATE employees SET job_title = "${job_title}"  WHERE employee_number = ${employee_number}`, (err, rows) => {
    // console.log("as")
    if (err) return res.status(401).send(err.message)
    console.log("employee Update OK  " +job_title)
    return res.status(200).send()
    // console.log(err)
  })
})

module.exports = app;