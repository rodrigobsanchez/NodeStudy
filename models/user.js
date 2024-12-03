const mongodb = require('mongodb');
const dbConnection = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;  // ObjectId is the id from mongo db

class User {
    constructor(username , email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart; //{items: []}
        this._id = id;
    }

    save() {
        const db = dbConnection();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            // return cp.productId == product._id;  or below
            return cp.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items]; // new array copy. deep copy.

        if(cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity });
        }

        const updatedCart = {
            items: updatedCartItems
        };

        const db = dbConnection();
        return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            { $set: { cart: updatedCart }} // choosing which field will update.
        );
    }

    // *** for mongodb we need to merge relations (JOINS) manually between collection like below

    getCart() {
        const db = dbConnection();
        const productIds = this.cart.items.map(i => {  // mapping like stream().map() from java retrieving all prodIds
            return i.productId;
        });

        return db.collection('products').find({ _id: { $in: productIds } }) // $in mongo syntax for SQL IN () query 
        .toArray()
        .then(products => { // -- all prods from database that belong to user cart.
            return products.map(p => {
                return {...p, quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                };
            });
        });  
    }

    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter( item => {  // .filter() from javascript.
            return item.productId.toString() !== productId.toString();
        });

        return dbConnection().collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            { $set: { cart: {items: updatedCartItems} }}
        );

    }

    addOrder() {
        const db = dbConnection();
        return this.getCart()
            .then(products => {
                let orderPrice = 0;
                for(var i = 0; i < products.length; i++) {
                    orderPrice = orderPrice + (products[i].price * products[i].quantity);
                }
            
                const order = {
                    items: products,
                    user: {
                        _id: new ObjectId(this._id),
                        name: this.name
                    }, 
                    price: orderPrice
                }

                return db.collection('orders').insertOne(order);
            }).then(result => {   
                    this.cart = {items: []}; // setting cart to empty at user object
                    return db.collection('users').updateOne(
                        {_id: new ObjectId(this._id)},
                        { $set: { cart: {items: []} }} // setting cart to empty at mongo
                );
            }).catch(err => console.log(err));
    }

    getOrders() {
        const db = dbConnection();
        return db.collection('orders').find({ 'user._id': new ObjectId(this._id) })// '' is a way for searching for embedded information
        .toArray(); 
    }

    static findById(userId) {
        const db = dbConnection();
        // return db.collection('users').find({ _id: new ObjectId(userId)}).next();  // this one way of returning one.. next() will get one.. because find() can find more than one.
        return db.collection('users').findOne({ _id: new ObjectId(userId)})
            .then(user => {
                return user;
            })
            .catch(err => {
              console.log(err);
            });
    }
}

module.exports = User;