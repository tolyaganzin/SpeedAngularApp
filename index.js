var express = require('express');
var path    = require("path");
var app = express();
// var config          = require('./libs/config');
var bodyParser = require('body-parser');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public'));


////////////////////// Routes
// api
app.use('/api/v1', require('./routes/api/v1/index'));
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
