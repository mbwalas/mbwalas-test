var exec = require('child_process').exec;

/**
 * Re-publishes it to the specified Pub/Sub topic. This method is only expected
 * to work on GCE VM since it uses VM metadata server for auth tokens.
 * @param {{done: function(Error)}} context Context of the event being
 *     processed.
 * @param {{project: string, topic: string, text: string}} data Object
 *     containing the text and information about the project and Pub/Sub topic
 *     to which it will be written.
 */
exports.function = function publishToPubsubWithCurl(context, data) {
  encodedText = new Buffer(data.text).toString('base64');
  exec('curl http://metadata.google.internal/0.1/meta-data/service-accounts/' + 
       'default/acquire?scope=pubsub.readwrite',
       function (error, stdout, stderr) {
    authResult = JSON.parse(stdout);
    accessToken = authResult.accessToken;
    command = 'curl -H "Authorization: Bearer ' + accessToken +
        '" -H "Content-Type: application/json"' +
        ' -d "{ \\"messages\\":[{\\"data\\":\\"' +
        encodedText + '\\"}]}" https://pubsub.googleapis.com/v1/projects/' +
        data.project + '/topics/' + data.topic + ':publish';
    exec(command, function (error, stdout, stderr) {
      context.done(null);
    });
  });
}
