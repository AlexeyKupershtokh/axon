
var axon = require('..')
  , assert = require('better-assert');

var push = axon.socket('push')
  , pull = axon.socket('pull');

push.bind(3000);
pull.connect(3000);

push.on('ignored error', function(err){
  assert('EPIPE' == err.code);
  push.close();
  pull.close();
});

push.on('connect', function(){
  var err = new Error('faux EPIPE');
  err.code = 'EPIPE';
  push.socks[0]._destroy(err);
});