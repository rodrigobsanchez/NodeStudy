const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;  // the underscore means variable will be used only inside this file.

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://rodrigo:rodrigo@nodejslearning.8nvpy.mongodb.net/mongoNodeJsLearning?retryWrites=true&w=majority&appName=nodeJSLearning')
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback();
    }).catch(err => {
        console.log(err);
        throw err;  
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// module.exports = mongoConnect;




// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//     'node_complete',
//     'root',

//     'rodrigo',
//     {
//         dialect: 'mysql',
//         host: 'localhost'
//     }
// );

// module.exports = sequelize;


// const mysql = require('mysql2');


// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_complete',
//     password: 'rodrigo'
// });
// // mysql.createConnection

// module.exports = pool.promise();