import express = require('express');
var router = express.Router();

/* POST one value . */
router.get('/price', function(req, res, next) {
  res.send('price');
});

export = router;