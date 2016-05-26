var Stomp = require('stomp-client');


function publish(host, queue, body, port, destType) {
	var destination = '/' + destType + '/' + queue;
	var client = new Stomp(host, port);
	client.connect(function (sessionId) {
		client.publish(destination, body);
                client.disconnect(null);
	});
        
}

module.exports = {
	'publish msg': function (args) { publish(args.host, args.topic, args.body, args.port = 61613, 'topic'); },
        'queue msg': function (args) { publish(args.host, args.queue, args.body, args.port = 61613, 'queue'); }
};