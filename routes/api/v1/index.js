var express = require('express');
var router = express.Router();

console.log('api v1');
router.get('/test', function (req, res) {
    res.send('API v1 is running');
});
router.use('/user', require('./user/index'));

module.exports = router;
