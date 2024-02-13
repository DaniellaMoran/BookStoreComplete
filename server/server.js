const http = require('http');
const sequelize  = require('./sequelize');
require('./importModels');
const app = require('./app');

(async () => {
  try {
    await sequelize.authenticate();
    try {
      await sequelize.sync(); // This will create tables if they don't exist
      console.log('syncronised database');
    } catch (error) {
      console.error('Error syncronised:', error);
    }
    console.log('Database connection established and models synchronized.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit();
  }
})();

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
//http://localhost:3000/