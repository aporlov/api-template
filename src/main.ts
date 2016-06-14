import {config} from 'dotenv';
import * as express from  'express';
import * as  mongoose from 'mongoose';
import * as morgan form 'morgan';
config();
const db = mongoose.createConnection('mongodb://localhost/prices');
const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req,res)=>{
    res.send('welcome to my API');
});

app.get('*', (req, res)=>{
  res.status(404).send();
});



app.listen(port, ()=>{
    console.log('Running on PORT:' + port);
});

exports.app = app;
