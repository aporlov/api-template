import * as express from 'express';
import {default as auth} from '../lib/basicauth';
const router = express.Router();
const User = require('../models/user');

/* /api/price */
router.use(auth);
router.get('/', (req, res) => {
  res.send('price');
});

/*POST for creating acount. For test only 
router.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.json({success: false , msg: 'Please pass name password'});
  } else {
    let newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    newUser.save( (err)=>{
      if (err) {
         res.json({success: false , msg: 'Username already exists'});
      } else {
         res.json({success: true , msg: 'Successful created user'});
      }
    })

  }
}); */
export default router;