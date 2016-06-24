/*
Middleware for basic authentication 
*/
var basicAuth = require('basic-auth');
var User = require('../models/user');

var auth =  (req, res, next) => {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return  res.sendStatus(401);
  };
 var basic = basicAuth(req);
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