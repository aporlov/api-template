const test = require('tape');
const hash =  require('../dist/lib/hash.js').Hash;
const hashClass = new hash();

test('password missing', t => {
  t.plan(1);
  hashClass.create(null, (err, hash)=>{
    t.notEqual(err, null, 'Err equal null. Good!');
  });
});

test('Hash.create(\'123456\', cb())', t => {
  t.plan(3);
  hashClass.create('123456', (err, hash)=>{
    t.equal(err, null, 'Err not equal null. Good!');
    t.ok(hash,'Hash is not null.Good!' );
    t.equal(hash.split(':').length, 2 ,'Hash is rigth format hashsalt:hashpassword. Good!');
  });
});


