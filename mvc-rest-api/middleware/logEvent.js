const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const logEvent = async (message, logFileName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromise.mkdir(path.join(__dirname, '..', 'logs'));
    }

    await fsPromise.appendFile(
      path.join(__dirname, '..', 'logs', logFileName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

console.log(uuid());

module.exports = logEvent;
