const path = require('path'); // grab the whole path on your file structure. __dirname = the root folder of where this variable is being called
const express = require('express');

const rootDir = require('../util/path')

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}); 


module.exports = router;