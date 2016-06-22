/*
My Interfaces
*/
// for hashing and comparing password 
export interface iHash {
    create(password:string, callback:(err:any,password:string)=>void): void;
    compare(password:string, hash:string, callback:(err:any,result:boolean)=>void):void;
}
