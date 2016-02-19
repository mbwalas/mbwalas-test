var publishToPubsub = require('./function');

var context = {
  done: function(err) {
    console.log(err ? err : 'OK');
  }
};

var data = {
  project: 'active-triode-92108',
  topic: 'projects/active-triode-92108/topics/swalk-test-republish-topic',
  text: 'Manual Test'
};

publishToPubsub.function(context, data);
