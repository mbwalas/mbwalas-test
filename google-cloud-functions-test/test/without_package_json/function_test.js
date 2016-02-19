var fn = require('./function');

var context = {
  done: function(err) {
    console.log(err ? err : 'OK');
  }
};

var data = {
  project: 'apheleia-test',
  topic: 'apheleiaFunctionTopic',
  text: 'Manual Test'
};

fn.function(context, data);