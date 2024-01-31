const fs = require('fs');

const readStream = fs.createReadStream('./work-with-files/lorem.txt', {
  encoding: 'utf8',
});

const writeStream = fs.createWriteStream('./work-with-files/new-lorem.txt');

// readStream.on('data', (dataChunk) => {
//   writeStream.write(dataChunk);
// });

readStream.pipe(writeStream);
