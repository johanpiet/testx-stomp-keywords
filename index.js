var stomp = require('stompy');
var Stomp = require('stomp-client');


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
	client.disconnt
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
	// console.log('context', context);
	expect(context.__STOMP__[args.topic].length).toEqual(parseInt(args.count));
}

function flush(args, context) {
	context.__STOMP__[args.topic] = [];
}

module.exports = {
	'publish msg': function (args) { publish(args.host, args.topic, args.body, args.port = 61613, 'topic'); },
  'queue msg': function (args) { publish(args.host, args.queue, args.body, args.port = 61613, 'queue'); },
	'check msg count': checkMsgCount,
	'subscribe to topic': subscribe,
	'flush topic':flush
};
