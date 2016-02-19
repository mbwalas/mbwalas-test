/**
 * Converts the given text to lowercase and returns it.
 * @param {{success: function(result)}} context Context of the event being
 *     processed.
 * @param {{text: string, timeout: number}} data Object containing the text to
 *    lower and timeout after which it performs the operation
 */
exports.function = function lowercaseByHttp(context, data) {
  setTimeout(function() {
    context.success(data.text.toLowerCase());
  }, data.timeout)
}