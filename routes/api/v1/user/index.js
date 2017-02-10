var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;


router.get('/get-users', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  // Get a all
  collection.find({},{},function(e,docs){
      res.send(docs);
  });
}); //router

router.put('/add-user', function (req, res){
  var db = req.db;
  var collection = db.get("users");
  //  Isert a one
  collection.insert(req.body);
  collection.find({},{},function(e,docs){
      res.send(docs);
  });
}); //router

router.put('/update-user/:_id', function (req, res){
  var db = req.db;
  var collection = db.get("users");
  //  Update a one
  collection.update({_id: req.params._id}, req.body);
  res.send('ok');
}); //router

router.delete('/del-user/:_id', function (req, res){
  var db = req.db;
  var collection = db.get("users");
  // Delete a one
  collection.remove({_id: req.params._id});
  collection.find({},{},function(e,docs){
      res.send(docs);
  });

}); //router

module.exports = router;
