
require('dotenv').config()
var express = require('express'),
  app = express(),
  port = process.env.PORT 

  User = require('./Models/UserModel'),
  book = require('./Models/bookModel'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken"),
  cors = require('cors');

const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
mongoose.connect( mongoURI ).then(function(){
   console.log
   console.log("Connected to mongodb");
}, function(err) {
   
  console.log("Error connecting to mongodb");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
var routes = require('./routes/user_routes');
routes(app);
var routes = require('./routes/Userpage_routes');
routes(app);
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not foundAdelyasser' })
});

app.listen(port);

console.log(' RESTful API server started on: ' + port);

module.exports = app;