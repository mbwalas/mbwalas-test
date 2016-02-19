var gcloud = require('gcloud');

/**
 * Publishes the given text to the specified Pub/Sub topic.
 * @param {{done: function(Error)}} context Context of the event being
 *     processed.
 * @param {{project: string, topic: string, text: string}} data Object
 *     containing the text and information about the project and Pub/Sub topic
 *     to which it will be written.
 */
exports.function = function publishToPubsub(context, data) {
  var pubsub = gcloud.pubsub({
    projectId: data.project
  });
  var topic = pubsub.topic(data.topic);
  topic.publish({
    data: data.text
  }, function(err) {
    context.done(err);
  });
}
