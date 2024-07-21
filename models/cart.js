const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
        'data',
        'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            
            if(!err) {
                cart = JSON.parse(fileContent);
            }

            // analyze the cart for existing product.
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct };
                updatedProduct.qnt = updatedProduct.qnt + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;

            } else {
                updatedProduct = { id: id, qnt: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice; // addind a + before price to convert to number type productPrice as function param is type any... making the file a text instead of number.
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });

        });

    }

    static deleteProduct(id, productPrice) { 
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                return;
            }

            const updatedCart = { ...JSON.parse(fileContent) };

            const product = updatedCart.products.find(prod => prod.id === id);

            if (!product) {
                return;
            }

            const productQnt = product.qnt;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.productPrice - productPrice * productQnt;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });

    }


    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
          const cart = JSON.parse(fileContent);
          if (err) {
            cb(null);
          } else {
            cb(cart);
          }
        });
      }


      static getProducts(callback) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) {
                callback(null);
            } else {
                callback(cart);
            }
            
        });
      }
}
