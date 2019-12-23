var express = require('express');
var app = express.Router();
var session = require('express-session');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./classicmodels.sqlite', sqlite3.OPEN_READWRITE);

app.get('/', (req, res) => {
  // if (!session.user) return res.status(401).send('Not login..')
  db.all('SELECT * FROM productlines join products using(product_line) ', (err, rows) => {
    res.send(rows);
  });
});
app.get('/scale', (req, res) => {
  // if (!session.user) return res.status(401).send('Not login..')
  db.all('SELECT product_scale FROM productlines join products using(product_line) Group by product_scale', (err, rows) => {
    const list = rows.map(row => {
      return row.product_scale
    })
    res.send(list);
  });
});
app.get('/vendor', (req, res) => {
  // if (!session.user) return res.status(401).send('Not login..')
  db.all('SELECT product_vendor FROM productlines join products using(product_line) Group by product_vendor', (err, rows) => {
    const list = rows.map(row => {
      return row.product_vendor
    })
    res.send(list);
  });
});

app.post('/', (req, res) => {
  // if (!session.user) return res.status(401).send('Not login..')
  const { data, type } = req.body
  // console.log("in")
  if (type === 'promotion') {
    const { promotion , productCode } = data
    // console.log(productCode)
    db.all(`UPDATE products SET promotion = "${promotion}" where product_code = "${productCode}"`,(err,rows)=>{
      if (err) {
        console.log(err.message)
        return res.status(401).send("fail")
      }
      console.log("product promotion OK")
      return res.status(200).send("success")
    })
  }
  else {
    const { productCode, productName, productLine, productScale, productVendor, productDescription, quantityInstock, buyPrice, msrp, textDescription } = data

    db.all(`INSERT into products(product_code,product_name,product_line,product_scale,product_vendor,product_description,quantity_instock,buy_price,msrp)
                      VALUES ('${productCode}','${productName}','${productLine}','${productScale}','${productVendor}','${productDescription}',${quantityInstock},${buyPrice},${msrp})`, (err, rows) => {
      if (err) {
        console.log(err.message)
        return res.status(401).send("fail")
      }
      console.log("product Update OK")
      return res.status(200).send("success")
    })
  }

})

module.exports = app;
