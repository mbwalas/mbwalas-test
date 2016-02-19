var uppercaseToPubsub = require('./function');

var context = {
  done: function(err) {
    console.log(err ? err : 'OK');
  }
};

var data = {
  project: 'active-triode-92108',
  topic: 'projects/active-triode-92108/topics/uppercase-test-republish-topic',
  text: 'Manual Test'
};

uppercaseToPubsub.function(context, data);
