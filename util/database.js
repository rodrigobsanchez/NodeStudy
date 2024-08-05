const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'node_complete',
    'root',
    'rodrigo',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize;


// const mysql = require('mysql2');


// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_complete',
//     password: 'rodrigo'
// });
// // mysql.createConnection

// module.exports = pool.promise();