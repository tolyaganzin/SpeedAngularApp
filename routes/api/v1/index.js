var express = require('express');
var router = express.Router();

console.log('api');
router.get('/test', function (req, res) {
    res.send('API is running');
});
router.use('/user', require('./user/index'));

module.exports = router;
