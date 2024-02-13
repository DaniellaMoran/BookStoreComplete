require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: 1433,
  username: process.env.USER,
  password: process.env.PASSWORD,
  dialectOptions: {
    options: {
      trustedConnection: true, // For Windows Authentication
    },
  },
  define: {
    timestamps: false,
  },
  logging: console.log,
},);

module.exports = sequelize;


  // // port: 1433,
  // dialectOptions: {
  //   // trustedConnection: true,
  //   options: {
  //     // encrypt: false, // For Azure SQL, you should enable encryption
  //     // trustedConnection: true,
  //     // useUTC: true
  //   },
  //   // connectionString:"Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;"
  // },
    // username: process.env.USER,
  // password: process.env.PASSWORD,