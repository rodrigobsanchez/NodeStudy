const path = require('path'); // grab the whole path on your file structure. __dirname = the root folder of where this variable is being called
const express = require('express');

const adminData = require('./admin');

const productsController = require('../controllers/products')

const router = express.Router();

router.get('/', productsController.getProducts); 


module.exports = router;