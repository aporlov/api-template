'use strict';

/*
 * Module dependencies.
 */

const test = require('tape');
const request = require('supertest');
const app = require('../dist/main.js').app;

test('Home page', t => {
  request(app)
    .get('/')
    .expect(200)
    .end(function (err, res) {
       t.error(err, 'No error');
      t.end();
    });
});

test('GET /api/price with right auth', t =>{
  request(app)
     .get('/api/price')
     .auth('test','123456')
     .expect(200)
     .end(function (err, res) {
     t.error(err, 'No error');
      t.end();
    });
});

test('GET /api/price with wrong auth', t =>{
  request(app)
     .get('/api/price')
     .auth('test','1234567')
     .expect(401)
     .end(function (err, res) {
     t.error(err, 'No error');
      t.end();
    });
});

test.onFinish(() => process.exit(0));
