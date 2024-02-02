const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const logEvent = require('./middleware/logEvent');
const app = express();

// custom middleware logger
app.use((req, res, next) => {
  logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.url}`);
  next();
});

const whitelist = ['http://localhost:3500'];

const corsOptions = {
  option: (origin, callback) => {
    if (whilelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// build-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

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

app.all('/*', (req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('text').send('404 Not Found');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
