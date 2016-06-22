/*
User model.
*/
import {Hash} from '../lib/hash';
const mongoose = require('mongoose') ; // 
const hash = new Hash();
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
           type: String,
           unique: true,
           required: true
        },
    password: {
            type: String,
            required: true
    }
});

// Get hash and save in database/ Format is hashsalt:hashpassword
UserSchema.pre('save', function(next){
   let user = this;
   if( user.isNew || user.isModified('password')) {
    hash.create(user.password,(err, hash)=>{
     if (err) {
         next(err)
        }
        user.password = hash;
        next();
    });
   }else{
       next();
   }
});
//Compare password 
UserSchema.methods.comparePassword = function(passw, cb){
    hash.compare(passw, this.password, (err, isMatch)=> {
         if (err){
             cb(err);
         }
         cb(null,isMatch);
    })
}
module.exports = mongoose.model('User', UserSchema);