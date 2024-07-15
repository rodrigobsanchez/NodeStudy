const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct); 

router.post('/add-product', adminController.postAddProduct);

// admin/products --> /admin is being inserted at app.js
router.get('/products', adminController.getProducts);


module.exports = router;