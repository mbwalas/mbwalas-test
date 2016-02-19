var gcloud = require('gcloud');
var util = require('util');
var projectId = process.env.GCP_PROJECT

/**
 * Reads the json file given in 'data' from gcs and writes the given
 * text field to the given Pub/Sub topic.
 * @param {{done: function(Error)}} context Context of the event being
 *     processed.
 * @param {{name: string, bucket: string}} gcs file that was changed.
 *     The file must then contain {{project: string, topic: string,
 *     text: string}} in json representation, which is a data Object
 *     containing the text and information about the project and Pub/Sub topic
 *     to which the text will be written.
 */
exports.function = function gcsToPubsub(context, data) {
  console.log("Using projectId: " + projectId);
  console.log("Got event data: " + util.inspect(data, false, null));

  if (data.name == null) {
    console.log("Dropping an event for entire bucket (no file name)");
    context.done(null);
    return;
  }

  var gcs = gcloud.storage({projectId: projectId});
  var bucket = gcs.bucket(data.bucket);

  var content = '';
  var gotError = false;
  var readStream = bucket.file(data.name).createReadStream();
  readStream.on('data', function(buf) { content += buf.toString(); });
  readStream.on('end', function() {
    console.log("Got file data: " + content);
    if (gotError) {
      // If the file doesn't exist, we will still get data and the 'end' event,
      // see: https://github.com/GoogleCloudPlatform/gcloud-node/issues/772
      // This was probably a deletion event from a previous test, so we
      // should drop the event.
      console.log("Dropping an event for file that cannot be read: " + data.name);
      context.done(null);
      return;
    }
    var fileData = JSON.parse(content);
    var pubsub = gcloud.pubsub({projectId: fileData.project});
    var topic = pubsub.topic(fileData.topic);
    topic.publish({
      data: fileData.text
    }, function(err) {
      context.done(err);
    });
  });
  readStream.on('error', function(err) {
    console.log("Error opening a gcs file " + data.name + ": " + err)
    gotError = true;  // The data will still be read (an XML error message).
  });
}
