const fsPromise = require('fs').promises;
const path = require('path');

const fileOps = async () => {
  try {
    const data = await fsPromise.readFile(
      path.join(__dirname, 'starter.txt'),
      'utf8'
    );

    await fsPromise.writeFile(path.join(__dirname, 'promiseWrite.txt'), data);

    await fsPromise.appendFile(
      path.join(__dirname, 'promiseWrite.txt'),
      '\n\n nice to meet you!!'
    );

    await fsPromise.rename(
      path.join(__dirname, 'promiseWrite.txt'),
      path.join(__dirname, 'promiseComplete.txt')
    );
  } catch (err) {
    console.error(err);
  }
};

fileOps();
