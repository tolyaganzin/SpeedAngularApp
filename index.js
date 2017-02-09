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
    var collection = db.collection("users");
    // Get a all
    collection.find().toArray(function(err, result) {
      res.send(result);
      db.close();
    }); //collection
  }); //db
}); //app

app.put('/api/add-user', function (req, res){
  db.open(function(err, db) {
    var collection = db.collection("users");
    //  Isert a one
    collection.insert(req.body);
    collection.find().toArray(function(err, result) {
      res.send(result);
      db.close();
    }); //collection
  }); //db
}); //app

app.put('/api/update-user/:_id', function (req, res){
  db.open(function(err, db) {
    var collection = db.collection("users");
    //  Update a one
    collection.update({"_id": new ObjectId(req.params._id)}, req.body, function(err, result) {
        if (err) {
          console.log(err);
          res.send(result);
          db.close();
        } else {
          res.send(result);
          db.close();
        }
    }); //collection
  }); //db
}); //app

app.delete('/api/del-user/:_id', function (req, res){
  db.open(function(err, db) {
    var collection = db.collection("users");
    // Delete a one
    collection.remove({_id: new ObjectId(req.params._id)}, function(err) {
        if (err) {
            console.log(err);
            db.close();
        } else {
          collection.find().toArray(function(err, result) {
            res.send(result);
            db.close();
          });
        }
    }); //collection
  }); //db
}); //app

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
