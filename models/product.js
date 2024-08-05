const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// defining below the javascript object with some table creation details.

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // AUTO INCREMENT
        allowNull: false, // NOT NULL
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Product;