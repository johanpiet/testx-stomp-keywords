var Stomp = require('stomp-client');


function publish(host, queue, body, port) {
	var destination = '/queue/' + queue;
	var client = new Stomp(host, port);
	client.connect(function (sessionId) {
		client.publish(destination, body);
	});
}

module.exports = {
	'publish msg': function (args) { publish(args.host, args.queue, args.body, args.port = 61613); }
};