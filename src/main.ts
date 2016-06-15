import * as  mongoose from 'mongoose';
import app from './express';
import {default as config} from './env';

mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to database: ${config.db}`);
 });
app.listen(config.port, ()=>{
    console.log('Running on PORT:' + config.port);
});

exports.app = app;