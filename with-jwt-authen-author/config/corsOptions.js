const whitelist = ['http://localhost:3500'];

const corsOptions = {
  option: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
