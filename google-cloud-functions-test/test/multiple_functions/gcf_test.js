var functions = require('./gcf');

var context = {
  done: function(err) {
    console.log(err ? err : 'OK');
  }
};

functions.publishToPubsub(
  context,
  {
    project: 'active-triode-92108',
    topic: 'projects/active-triode-92108/topics/test-republish-topic',
    text: 'Manual Test'
  }
);

functions.appendLowercaseToPubsub(
  context,
  {
    project: 'active-triode-92108',
    topic: 'projects/active-triode-92108/topics/lowercase-test-republish-topic',
    text: 'Manual Test'
  }
);

functions.appendUppercaseToPubsub(
  context,
  {
    project: 'active-triode-92108',
    topic: 'projects/active-triode-92108/topics/uppercase-test-republish-topic',
    text: 'Manual Test'
  }
);

