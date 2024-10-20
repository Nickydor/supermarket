const Sequelize = require('sequelize');
const db = require('../helpers/db');

const Products = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    prodName: Sequelize.STRING,
    prodPrice: Sequelize.FLOAT,

},

);

module.exports = Products;