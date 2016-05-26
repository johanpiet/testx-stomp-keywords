testx-stomp-keywords
=====

A library that extends testx with keywords for publishing to stomp. This library is packaged as a npm package.

## How does it work
From the directory of the art code install the package as follows:
```sh
npm install testx-stomp-keywords --save
```

After installing the package add the keywords to your protractor config file as follows:

for testx 0.x
```
testx.addKeywords(require('testx-stomp-keywords'))
```
for testx 1.x
```
testx.keywords.add(require('testx-stomp-keywords'))
```

Please remember that this is an asynchronous protocol: subscriptions and publications may not be handled by the server in the expected order!

## Keywords

| Keyword                | Argument name | Argument value  | Description | Supports repeating arguments |
| ---------------------- | ------------- | --------------- |------------ | ---------------------------- |
| publish msg            |               |                 | publishes a message to the topic |  |
|                        | host          | The host of the topic || No |
|                        | topic         | The name of the topic to publish to|| No |
|                        | body          | The text of the message that will be published || No |
|                        | port          | The port of the topic (default (61613) || No |
| queue msg              |               |                 | publishes a message to the stomp-queue |  |
|                        | host          | The host of the queue || No |
|                        | queue         | The name of the queue to publish to|| No |
|                        | body          | The text of the message that will be published || No |
|                        | port          | The port of the queue (default (61613) || No |
| check msg count        |               |                 | Checks if the number of received messages (from the moment of subscribing to the topic) equals 'count' |  |
|                        | topic          | The name of the topic || No |
|                        | count         | The count to check against|| No |
| subscribe to topic              |               |                 | subscribe to a topic to receive messages |  |
|                        | host          | The host of the topic || No |
|                        | topic         | The name of the topic to subscribe to|| No |
|                        | port          | The port of the topic (default (61613) || No |
| flush topic            |               |                 | Clears the list of received messages |  |
|                        | topic          | The name of the topic || No |


'publish msg': function (args) { publish(args.host, args.topic, args.body, args.port = 61613, 'topic'); },
'queue msg': function (args) { publish(args.host, args.queue, args.body, args.port = 61613, 'queue'); },
'check msg count': checkMsgCount,
'subscribe to topic': subscribe,
'flush topic':flush
