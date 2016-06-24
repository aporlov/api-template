/*
Class for implementing IHash interface with npm module 'pwd'
Result hash string  is  hashsalt:hashpassword
*/
import {iHash } from './interfaces';
var pass = require('pwd');

export class Hash implements iHash{ 
create(hashPassword:string, cb):void {
    let usersalt:string;
    let userhash:string;
    if (!cb) {
        return;
    }
    pass.hash(hashPassword, (err, salt, hash)=> {
        if (err) {
                   console.error('There was an error.  parameter =' + hashPassword, err);
                   return cb(err);
        }
        if (salt && hash ) {  
        return cb(null,salt +':'+ hash );
        }   
    });    
}
compare(password:string, hash:string, cb):void {
    try{
        let hashStrings = hash.split(':');
        let saltFromHash = hashStrings[0]; 
        let passwordFromHash =  hashStrings[1];
        pass.hash(password, saltFromHash, (err, hash)=> {
         if (err) {
              return cb(err);
              
         } 
         if (passwordFromHash == hash) 
         {
             return cb (null, true);
              
            } else {
              return cb(null, false); 
            }       
        });
    }catch (err){
      console.error('There was an error.  password = ' + password + ' hash= ' + hash, err);
      return cb(err);  
    }    
}
}
