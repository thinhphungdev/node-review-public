const logEvents = require('./logEvent');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
  myEmitter.emit('log', 'log event emitted');
}, 2000);
