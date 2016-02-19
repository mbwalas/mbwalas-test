/**
 * Converts the given text to lowercase and returns it.
 * @param {{success: function(result)}} context Context of the event being
 *     processed.
 * @param {{text: string}} data Object containing the text to lower.
 */
exports.function = function lowercaseByHttp(context, data) {
	context.success(data.text.toLowerCase());
}
