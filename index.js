var stomp = require('stompy');
var Stomp = require('stomp-client');
var JSONPath = require('jsonpath-plus');


function publish(host, queue, body, port, destType) {
	var destination = '/' + destType + '/' + queue;
	var client = stomp.createClient(
		{
				host: host,
				port: port,
				retryOnClosed: true,
		}
	);
	client.publish(destination, body);
}

function subscribe(args, context) {
	var destination = '/topic/' + args.topic;
	var client = new Stomp(args.host, args.port);

	ctx = context.__STOMP__ = context.__STOMP__ || {}
	ctx[args.topic] = ctx[args.topic] || []

	client.connect(function(sessionId) {
    client.subscribe(destination, function(body, headers) {
			console.log('received');
			console.log(body);
			var msg = {
				body: body,
				headers: headers
			};
			ctx[args.topic].push(msg);
    });
  });
}

function checkMsgCount(args, context) {
	expect(context.__STOMP__[args.topic].length).toEqual(parseInt(args.count), assertFailedMsg(context, "Message count is wrong"));
}

function assertMsg(args, context) {
	var found = false;
	context.__STOMP__[args.topic].forEach(function (msg) {
		var json = JSON.parse(msg.body);
		var result = JSONPath({json: json, path: args.id_path});
		if(result.length > 0 && result[0] == args.id_value) {
			found = true;
			result = JSONPath({json: json, path: args.assert_path});

			expect(result).not.toBeNull(assertFailedMsg(context, "Assertion key " + args.assert_path + " not found in the message"));
			if(result) {
				expect(result.length).toBeGreaterThan(0, assertFailedMsg(context, "Assertion key " + args.assert_path + " not found in the message"));
				if(result.length > 0) {
					expect(result[0] + "").toEqual(args.assert_value + "", assertFailedMsg(context, "Assertion value does not match message"));
				}
			}
		}
	});

	expect(found).toBeTruthy(assertFailedMsg(context, "No message found for the identifier "+ args.id_path + "[" + args.id_value + "]"));
}

function flush(args, context) {
	context.__STOMP__[args.topic] = [];
}

function assertFailedMsg (context, failedMsg) {
	if(context && context._meta) {
  	return failedMsg + " at: file '" + context._meta.file + "', sheet '" + context._meta.sheet + "', row " + context._meta.Row;
	}
	return failedMsg;
}

module.exports = {
	'publish msg': function (args) { publish(args.host, args.topic, args.body, args.port = 61613, 'topic'); },
  'queue msg': function (args) { publish(args.host, args.queue, args.body, args.port = 61613, 'queue'); },
	'check msg count': checkMsgCount,
	'subscribe to topic': subscribe,
	'assert msg': assertMsg,
	'flush topic':flush
};
