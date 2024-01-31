const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const logEvent = async (message) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}`;

  try {
    await fsPromise.appendFile(
      path.join(__dirname, 'logs', 'eventLogs.txt'),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

console.log(uuid());

module.exports = logEvent;
