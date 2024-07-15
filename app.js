const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const errorController = require('./controllers/error');


// this middleware in only for parsing body from request and responses.
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // grant read access to public folder

app.use('/admin', adminRoutes);
app.use(shopRouter);


app.use(errorController.get404);

app.listen(3000);

