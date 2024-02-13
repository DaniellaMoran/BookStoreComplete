# Tasks
1. Store config in a safe better way
2. Start to organize files
3. Create RESTful API
4. maybe use the config file the sequelize-cli provided.
5. apply associations between models.
6. add timestamps false to everything.
7. post first user

# progress
25/08/2023:
its late at night.
wrote models.
just fihished importing all the referenced models in the models.
finished requireing all the models in server js, and it seems to be working. i need to see whether i also need to use associations.
things like one to many and stuff.

# seqilize.js
is the file i used in order to creater the sequelize instance, the config of the connection to the azure db.
now, it's all happening in src/models/index, and its returning an object that contains both the sequelize instance and the models, so that i dont have to create each model an variable.

if i do want to create each model an variable, i can 'npm uninstall sequelize-cli', delete the src/models/index file, use the sequelize file again.
just dont forget to require the sequelize file so its called, and also call the authenticate and sync methods (the try and catch thing... its in the index in the modesls folder.).


using orm Sequelize
https://sequelize.org/

# model template
const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize'); // Import the Sequelize instance

const Demo = sequelize.define('Demo', {
    demoName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    }
});

module.exports = Demo;

# connection.js in config - now its simply in sequelize... but just in case
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // For Azure SQL, you should enable encryption
    },
  },
  host: process.env.SERVER,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = sequelize;
