var gcloud = require('gcloud');

/**
 * Converts the given text to lowercase and publishes it to the specified
 * Pub/Sub topic.
 * @param {{done: function(Error)}} context Context of the event being
 *     processed.
 * @param {{project: string, topic: string, text: string}} data Object
 *     containing the text and information about the project and Pub/Sub topic
 *     to which its lowercase version will be written.
 */
exports.function = function lowercaseToPubsub(context, data) {
  var pubsub = gcloud.pubsub({
    projectId: data.project
  });
  var topic = pubsub.topic(data.topic);
  topic.publish({
    data: data.text.toLowerCase()
  }, function(err) {
    context.done(err);
  });
}
