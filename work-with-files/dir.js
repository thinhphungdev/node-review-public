const fs = require('fs');

if (fs.existsSync('./new')) {
  console.log('Directory Already exists!!');
  fs.rmdir('./new', (err) => {
    if (err) throw err;
    console.log('Directory deleted successfully');
  });
  process.exit(1);
}

fs.mkdir('./new', (err) => {
  if (err) throw err;
  console.log('Directory created');
});
