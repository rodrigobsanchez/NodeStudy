const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
    path.dirname(
        require.main.filename),
        'data',
        'products.json'
);

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
      
    }); 
}


module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        
        getProductsFromFile( products => {
            if(this.id) { // will fails if is null.
                // this is for updating file into the array of products.
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                // this.id out of the blue here is to add new att to the object.
                this.id = Math.random().toString();
                products.push(this);

                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
          
        });

    }

    // adding a callback as param to execute a function after the execution. Managing the async stuff.
    static fetchAll(callback) {
        getProductsFromFile(callback)
        
    }

    static findById(id, callback) {
        getProductsFromFile(products => {
            // javascript filtering function
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            // .filter() will return array of objects...
            const updatedProduct = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                if(!err) {
                    Cart.deleteProduct(id, product.price);
                }
            })
        });
    }

}