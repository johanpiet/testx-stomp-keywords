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

## Keywords

| Keyword                | Argument name | Argument value  | Description | Supports repeating arguments |
| ---------------------- | ------------- | --------------- |------------ | ---------------------------- |
| publish msg            |               |                 | publishes a message to the topic |  |
|                        | host          | The host of the topic || No |
|                        | topic         | The name of the topic to publish to|| No |
|                        | body          | The text of the message that will be published || No |
|                        | port          | The port of the topic (default (61613) || No |
| queue msg            |               |                 | publishes a message to the stomp-queue |  |
|                        | host          | The host of the queue || No |
|                        | queue         | The name of the queue to publish to|| No |
|                        | body          | The text of the message that will be published || No |
|                        | port          | The port of the queue (default (61613) || No |
