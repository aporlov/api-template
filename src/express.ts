import * as express from  'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import {default as price} from './api/price';
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/api/price', price);

app.get('/', (req,res)=>{
    res.send('welcome to my API');
});


app.get('*', (req, res)=>{
  res.status(404).send();
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
   

/**********************************Functions**************************************/
// the generic logErrors might write request and error information to stderr
function logErrors(err, req, res, next) {
 // if (typeof err === 'string')
 //   err = new Error (err);
  console.error('logErrors', err.toString());
  next(err);
}

function clientErrorHandler(err, req, res, next) {
   // A flag indicating whether the current request (req) appears to be an AJAX request 
   // (i.e. it was issued with its "X-Requested-With" header set to "XMLHttpRequest".)
  if (req.xhr) {
    console.error('clientErrors response');
    res.status(500).json({ error: err.toString()});
  } else {
    next(err);
  }
}

// The “catch-all” errorHandler
function errorHandler(err, req, res, next) {
  console.error('lastErrors response');
  res.status(500).send(err.toString());
}
/**********************************************************************************/
export default app;