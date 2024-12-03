const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId; 

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        // this._id = new mongodb.ObjectId(id);
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;

    }

    save() {

        const db = getDb();
        let dbOperation;
        
        if(this._id) {
            console.log('Updating this product --> ' + this._id + '  name = ' + this.title);
            // update product
            dbOperation = db.collection('products')
            .updateOne(
                { _id: this._id },
                { $set: this });
                // '$set' above is att from mongo that is kind of a setter for the updated object. I could specify which fields i want to update for example

        } else {
            console.log('Creating new product --> ' + this.title);
            dbOperation = db.collection('products').insertOne(this);
        }

       return dbOperation.then(result => {
            console.log(result);
       }).catch(err => {
            console.log(err);
       }); 
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
                .toArray()  // like this finds all. toArray() return a cursor... from mongo db. which is something like Pageable.
                    .then(products => {
                        return products;
                    }).catch(err => {
                        console.log(err);
                    });
       
    }

    static findById(prodId) {
        const db = getDb();
        // console.log('prodId --> ' + prodId + ' ' + typeof prodId); 

        return db.collection('products')
        // .find({_id: mongodb.ObjectId.createFromHexString(prodId)}) //
        .find({_id: new ObjectId(prodId)}) // still work. might have to change for above later.
        .next()
        .then(product => { 
            console.log(product);
            return product; 
        }).catch(err => {
            console.log(err);
        });
    }


    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
            .then(result => { 
                console.log('Product has been deleted.');
            }).catch(err => {
                console.log(err);
        });;
    }

}

module.exports = Product;