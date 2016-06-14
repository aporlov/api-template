import * as express from 'express';
const router = express.Router();

/* POST one value . */
router.get('/', function(req, res, next) {
  res.send('price');
});

export default router;