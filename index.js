var stomp = require('stompy');
var q = require('q');


function publish(host, queue, body, port, destType) {
	var destination = '/' + destType + '/' + queue;
	var client = stomp.createClient(
		{
				host: host,
				port: port,
				retryOnClosed: false,
		}
	);
	client.publish(destination, body);
}

function subscribe(args, context) {
	var destination = '/topic/' + args.topic;
	var client = stomp.createClient(
		{
				host: args.host,
				port: args.port,
				retryOnClosed: false,
		}
	);
	ctx = context.__STOMP__ = context.__STOMP__ || {}
	ctx[args.topic] = ctx[args.topic] || []
	client.subscribe(destination, function(body) {
		console.log('received');
		console.log(body);
		var msg = {
			body: body
		};
		ctx[args.topic].push(msg);
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
