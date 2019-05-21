const Sequelize = require('sequelize');
const sequelize = require('../utils/database');



const RecipeSteps = sequelize.define('step', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    description: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    step: Sequelize.INTEGER
});


module.exports = RecipeSteps;