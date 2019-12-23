var express = require('express');
var app = express.Router();
var session = require('express-session');
var bcrypt = require('bcryptjs')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./classicmodels.sqlite', sqlite3.OPEN_READONLY);

/* GET users listing. */

app.get('/', (req, res) => {
  if (!session.user) return res.status(401).send('Not login..')
  return res.status(200).send('Login OK')
});

app.post('/', (req, res) => {
  const { employeenumber, password, type } = req.body
  // console.log(employeenumber,password)
  // console.log(password)
  if (type === 'Login') {
    db.all('SELECT * FROM employees as e join Employeelogin as el using(employee_number)', (err, rows) => {
      rows.map( row => {
        if (bcrypt.compareSync(`${row.pw}`, password) && row.employee_number == employeenumber) {
          console.log(row)
          session.user = row
          // console.log(row){employee_number , last_name,first_name ,extension , email , office_code , reports_to , job_title}
          return res.status(200).send(session.user)
        }
      })
      res.status(401).send()      
    })
  }
  else {
    session.user = null
  }
})

module.exports = app;