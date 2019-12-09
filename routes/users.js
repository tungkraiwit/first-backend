var express = require('express');
var app = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('classicmodels.sqlite',sqlite3.OPEN_READONLY);

/* GET users listing. */

app.get('/', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT *  FROM employees', (err, rows) => {
    // console.log(rows);
    // const allUsernames = rows.map(e => e.email);
    // console.log(allUsernames);    
    res.send(rows);
  });  
});
// app.post('/',(req,res) => {
//   // res.send(req.body.userName+'   '+req.body.password)
//   if(req.body.userName === "555"){
//     const eieiV1 = {
//       eieiLove : 55,
//       krikri:99
//     }
//     res.send(eieiV1)
//   }
//   else{
//     res.send("NAN")
//   }
// })


module.exports = app;
