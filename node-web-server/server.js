const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3500;

const app = express();

const one = function (req, res, next) {
  console.log('one');
  next();
};

const two = function (req, res, next) {
  console.log('two');
  next();
};

app.get('^/$|/index(.html)', (req, res) => {
  //   res.send('Hello world!');
  //   res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)', (req, res) => {
  //   res.send('Hello world!');
  //   res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)', (req, res) => {
  res.redirect(301, 'new-page.html');
});

app.get('/chain(.html)?', [one, two]);

app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
