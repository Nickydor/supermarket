const Sequelize = require('sequelize');
const db = new Sequelize('supermarket', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = db;

