var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/SpeedAngularApp');

var routesV1 = require('./routes/api/v1/index');

var app = express();
// var config          = require('./libs/config');
// var Server = require('mongodb').Server;
// // var ObjectId = require('mongodb').ObjectId;
// var db = new Db('SpeedAngularApp', new Server('localhost', 27017));

app.use(logger('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(express.static('public'));
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
//////////////////////////////

////////////////////// Routes
// api
app.use('/api/v1', routesV1);
// main page
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
// error
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//////////////////////////////

app.listen(3300, function () {
  console.log('Example app listening on port 3300!');
});

module.exports = app;
