var lowercaseToPubsub = require('./function');

var context = {
  success: function(result) {
    console.log(result != 'manual test' ? result : 'OK');
  }
};

var data = {
  text: 'Manual Test'
};

lowercaseToPubsub.function(context, data);
