const path = require('path'); // grab the whole path on your file structure. __dirname = the root folder of where this variable is being called
const express = require('express');

const rootDir = require('../util/path')
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Shopping cart --> ', adminData.products);
    const products = adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });  // it will use the default template engine defined at app.js app.set.
}); 


module.exports = router;