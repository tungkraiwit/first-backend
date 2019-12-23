var express = require('express');
var app = express.Router();
var session = require('express-session');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('classicmodels.sqlite', sqlite3.OPEN_READWRITE);


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

app.get('/', (req, res) => {
  // if (!session.user) return res.status(401).send('Not login..')
  db.all('SELECT *  FROM customers join payments using(customer_number)', (err, rows) => {
    res.send(rows);
  });
});

app.get('/payment', (req, res) => {
  // if (!session.user) return res.status(401).send('Not login..')
  db.all('SELECT order_number ,customer_name , amount ,check_number ,order_date , required_date ,shipped_date , status  FROM payments join customers using(customer_number) join orders using(customer_number) WHERE status = "Shipped"', (err, rows) => {
    res.send(rows);
  });
});


app.post('/', (req, res) => {
  const { data } = req.body
  const { Name, Firstname, Lastname, Phone, Address1, Address2, city, state, postalcode, country, salesrepemployeeNumber, creditLimit } = data
  db.all(`INSERT into customers(customer_name,contact_lastname,contact_firstname,phone,addressLine1,addressLine2,city,state,postalCode,country,salesrepemployee_number,creditlimit)
  VALUES ("${Name}","${Firstname}","${Lastname}","${Phone}","${Address1}","${Address2}","${city}","${state}","${postalcode}","${country}","${salesrepemployeeNumber}","${creditLimit}")`, (err, rows) => {
    if (err) return res.status(401).send()
      console.log("Customer Update OK")
      return res.status(200).send()
  })
})

module.exports = app;
