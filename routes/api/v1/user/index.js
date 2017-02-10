var express = require('express');
var router = express.Router();
// var Db = require('mongodb').Db;
// var Server = require('mongodb').Server;
var ObjectId = require('mongodb').ObjectId;


// var db = new Db('SpeedAngularApp', new Server('localhost', 27017));


router.get('/get-users', function(req, res) {
  req.db.open(function(err, db) {
    var collection = db.collection("users");
    // Get a all
    collection.find().toArray(function(err, result) {
      res.send(result);
      db.close();
    }); //collection
  }); //req.db
}); //router

router.put('/add-user', function (req, res){
  req.db.open(function(err, db) {
    var collection = db.collection("users");
    //  Isert a one
    collection.insert(req.body);
    collection.find().toArray(function(err, result) {
      res.send(result);
      db.close();
    }); //collection
  }); //req.db
}); //router

router.put('/update-user/:_id', function (req, res){
  req.db.open(function(err, db) {
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
  }); //req.db
}); //router

router.delete('/del-user/:_id', function (req, res){
  req.db.open(function(err, db) {
    var collection = db.collection("users");
    // Delete a one
    collection.remove({_id: new ObjectId(req.params._id)}, function(err) {
        if (err) {
            console.log(err);
            req.db.close();
        } else {
          collection.find().toArray(function(err, result) {
            res.send(result);
            req.db.close();
          });
        }
    }); //collection
  }); //req.db
}); //router

module.exports = router;
