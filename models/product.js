const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        // this approach helps protect against attacks of queries inside my insert query.
      return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description]
        );
    }

    static fetchAll() { 
        // this is returning a promise... with the query results.
        return db.execute('SELECT * FROM products');
    }

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE id = ?', [id]);
    }

    static deleteById(id) {
       
    }

}