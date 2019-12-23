var express = require('express');
var app = express.Router();
var session = require('express-session');

app.get('/', (req, res) => {
  // console.log(req.session)  
  if (!session.user) return res.status(401).send('Not login..')
  // console.log(session)
  res.status(200).send(session.user)
});

module.exports = app;
