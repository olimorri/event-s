const mongoose = require('mongoose');
const config = require('../config');
// import config from '../config';

module.exports = mongoose.connect(
  `mongodb://${config.host}:${config.dbPort}/${config.dbName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },

  (err) => {
    if (err) {
      console.log(`😞 Sorry, something went wrong! ${err}`); // eslint-disable-line no-console
    } else {
      console.log(`🦆 Database (sessions) connected @ port ${config.dbPort}!`); // eslint-disable-line no-console
    }
  },
);
