var gcloud = require('gcloud');

/**
 * Publishes the given text to the specified Pub/Sub topic.
 * @param {{done: function(Error)}} context Context of the event being
 *     processed.
 * @param {{project: string, topic: string, text: string}} data Object
 *     containing the text and information about the project and Pub/Sub topic
 *     to which it will be written.
 */
exports.publishToPubsub = function(context, data) {
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

/**
 * Appends given text in lowercase to the given text and and publishes it to
 * the specified Pub/Sub topic.
 * @param {{done: function(Error)}} context Context of the event being
 *     processed.
 * @param {{project: string, topic: string, text: string}} data Object
 *     containing the text and information about the project and Pub/Sub topic
 *     to which result will be written.
 */
exports.appendLowercaseToPubsub = function(context, data) {
  data.text = data.text + data.text.toLowerCase();
  exports.publishToPubsub(context, data);
}

/**
 * Appends given text in uppercase to the given text and and publishes it to
 * the specified Pub/Sub topic.
 * @param {{done: function(Error)}} context Context of the event being
 *     processed.
 * @param {{project: string, topic: string, text: string}} data Object
 *     containing the text and information about the project and Pub/Sub topic
 *     to which result will be written.
 */
exports.appendUppercaseToPubsub = function(context, data) {
  data.text = data.text + data.text.toUpperCase();
  exports.publishToPubsub(context, data);
}