const Sequelize = require('sequelize');
const sequelize = new Sequelize('recipe-complete', 'root', 'password', { host: 'localhost', dialect: 'mysql' });

module.exports = sequelize;