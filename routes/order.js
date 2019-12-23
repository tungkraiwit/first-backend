var express = require('express');
var app = express.Router();
var session = require('express-session');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./classicmodels.sqlite', sqlite3.OPEN_READWRITE);

app.get('/', (req, res) => {
  // if (!session.user) return res.status(401).send('Not login..')
  db.all('SELECT * FROM orderdetails join orders using(order_number) join customers using(customer_number)', (err, rows) => {
    res.send(rows);
  });
});

app.post('/', (req, res) => {
  // if (!session.user) return res.status(401).send('Not login..')
  const { data, type } = req.body
  // console.log("wait")
  if (type === 'ADD') {
    // console.log("sdfghjkl")
    const { OrderNumber, OrderDate, RequiredDate, ShippedDate, status, QuantityOrdered, PriceEach, CustomerName, Comment, employee_number } = data
    db.all(`SELECT c.customer_number , MAX(o.order_number)+1 as order_number FROM customers as c , orders as o  WHERE c.customer_name like '${CustomerName}'`, (err, rows) => {
      // console.log(rows[0].order_number)
      db.all(`INSERT into orders(order_number,order_date,required_date,shipped_date,status,comments,customer_number)
                        VALUES (${rows[0].order_number},"${OrderDate}","${RequiredDate}","${ShippedDate}","${status}","${Comment}",${rows[0].customer_number})`, (err, rows) => {
        if (err) return res.status(401).send()
        console.log("order add OK")
        return res.status(200).send()
      })
    })
  }
  else {
    console.log("5555")
    const { employee_number, status , customer_number, order_number ,price_each} = data
    console.log(customer_number)
    db.all(`UPDATE orders SET status = "${status}" WHERE customer_number = "${customer_number}"`, (err, rows) => {
      if (err) return res.status(401).send()
      console.log("order Update OK")
      return res.status(200).send()
    })
  }
})

module.exports = app;
