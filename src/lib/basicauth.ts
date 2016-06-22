/*
Middleware for basic authentication 
*/
const basicAuth = require('basic-auth');
const User = require('../models/user');

const auth =  (req, res, next) => {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return  res.sendStatus(401);
  };
  const basic = basicAuth(req);
  if (!basic) {  unauthorized(res);}
  User.findOne({
      'name':  basic.name
  }, function(err, user) {
      if (err) {
        return next(err);
      };
      if (!user) {
           return  unauthorized(res);
      } else {
          user.comparePassword(basic.pass, function(err, isMatch) {
            if (err) {
              return next(err);
            };
            if (isMatch) {
                    return  next();
            } else {
               return  unauthorized(res);
            }
          })
      }
  });
}
export default auth;