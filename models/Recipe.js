const Sequelize = require('sequelize');
const sequelize = require('../utils/database');



const Recipe = sequelize.define('recipe', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING,
    imageUrl: Sequelize.STRING
});


module.exports = Recipe;