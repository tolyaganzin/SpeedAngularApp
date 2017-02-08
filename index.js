var express = require('express');
var path    = require("path");
var app = express();
// var config          = require('./libs/config');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public'));

var Db = require('mongodb').Db;
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var ObjectId = require('mongodb').ObjectId;

var db = new Db('SpeedAngularApp', new Server('localhost', 27017));

app.get('/api', function (req, res) {
    res.send('API is running');
});


app.get('/api/get-users', function(req, res) {

  db.open(function(err, db) {
    // Fetch a collection to insert document into
    var collection = db.collection("users");
    // Find a all
    collection.find().toArray(function(err, result) {
      res.send(result);
      db.close();
     });
  });
});

app.put('/api/add-user', function (req, res){
  db.open(function(err, db) {
  // Fetch a collection to insert document into
    var collection = db.collection("users");
    //  Isert a one
    collection.insert(req.body);
    collection.find().toArray(function(err, result) {
      res.send(result);
      db.close();
    });
  });
});
app.delete('/api/del-user/:_id', function (req, res){
  db.open(function(err, db) {
  // Fetch a collection to insert document into
    var collection = db.collection("users");
    // collection.remove({"_id": req.params._id}, function(err, numberOfRemovedDocs) {
    //   console.log(req.params);
    // });
    console.log(req.params._id);
    collection.remove({_id: new ObjectId(req.params._id)}, function(err, result) {
        if (err) {
            console.log(err);
            db.close();
        } else {
          collection.find().toArray(function(err, result) {
            res.send(result);
            db.close();
          });
        }
    });

  });
});



// app.get('/api/articles/:id', function(req, res) {
//     res.send('This is not implemented now');
// });
//
// app.put('/api/articles/:id', function (req, res){
//     res.send('This is not implemented now');
// });
//
// app.delete('/api/articles/:id', function (req, res){
//     res.send('This is not implemented now');
// });



app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3300, function () {
  console.log('Example app listening on port 3300!');
});
