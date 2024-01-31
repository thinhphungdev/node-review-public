const fs = require('fs');
const path = require('path');

// read file
fs.readFile(path.join(__dirname, 'lorem.txt'), 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// exit on uncaught exception
process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

// write file
fs.writeFile(
  path.join(__dirname, 'lorem.txt'),
  'Very nice to meet you',
  (err) => {
    if (err) throw err;
    console.log('Write to lorem.text successfully');

    fs.appendFile(
      path.join(__dirname, 'lorem.txt'),
      '\n\n Yes it is',
      (err) => {
        if (err) throw err;
        console.log('Apend new file successfully');
      }
    );
  }
);
