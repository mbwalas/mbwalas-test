// Our manual test uses an existing storage bucket gcs-to-pubsub-test
// in this project and a file gcsToPubSubTestData.json inside the bucket.
// The file must contain json data with keys: 'project', 'topic' and 'text'.

process.env['GCP_PROJECT'] = 'active-triode-92108';

var gcsToPubsub = require('./function');

var context = {
  done: function(err) {
    console.log(err ? err : 'OK');
  }
};

// In general, the data object for gcs triggers contains more fields,
// but we fill only the fields that are used by our function.
// Note that the given bucket must exist in our project
// and the given file must contain valid json data.
var data = {
  name: 'gcsToPubSubTestData.json',
  bucket: 'gcs-to-pubsub-test'
};

var dataForNonExisingFile = {
  name: 'fileDoesNotExist.json',
  bucket: 'gcs-to-pubsub-test'
};

var dataForBucketChange = {
  bucket: 'gcs-to-pubsub-test'
};

gcsToPubsub.function(context, data);

console.log(
    "Expect error messages for nonexising file (fileDoesNotExist.json)")
gcsToPubsub.function(context, dataForNonExisingFile);

gcsToPubsub.function(context, dataForBucketChange);
