const path = require('path');
const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    console.log('In the middleware add product middleware');
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}); 

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    products.push({
        title: req.body.title
    });
    res.redirect('/');
});


exports.route = router;
exports.products = products;