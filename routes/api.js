var express = require('express');
var router = express.Router();
var client = require('../utils/database');
require('dotenv').config();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API is working properly');
});

// POST sql query to database
router.post('/db', async function(req, res, next) {
  // get formdata from request
  var data = req.body;
  console.log(data);

  if (data.query) {
    // query database
    var resp = await client.query(data.query);
    res.send(resp);
  } else {
    res.send("No query provided");
  }

});


module.exports = router;