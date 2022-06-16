const config = require('./dist/config.js');

module.exports = {
  client: 'pg',
  connection: config.default.database.connection,
  migrations: {
    directory: './dist/migrations',
  },
  seeds: {
    directory: './dist/seeds',
  },
};
