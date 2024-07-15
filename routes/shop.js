const path = require('path'); // grab the whole path on your file structure. __dirname = the root folder of where this variable is being called
const express = require('express');

const adminData = require('./admin');

const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/', shopController.getIndex); 

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);


module.exports = router;