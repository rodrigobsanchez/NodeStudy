const path = require('path'); // grab the whole path on your file structure. __dirname = the root folder of where this variable is being called
const express = require('express');

const adminData = require('./admin');

const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/', shopController.getIndex); 

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct); // : means the same as {id} at url paths.

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);


module.exports = router;