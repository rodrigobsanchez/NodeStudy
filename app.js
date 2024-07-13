const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const app = express();

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');


// this middleware in only for parsing body from request and responses.
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // grant read access to a folder

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use('/', (req, res, next) => {
    console.log('This always runs...');
    next();
}); 

app.listen(3000);

