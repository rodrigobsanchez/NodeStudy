const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');


// this middleware in only for parsing body from request and responses.
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // grant read access to public folder

app.use('/admin', adminData.route);
app.use(shopRouter);


app.use((req, res, next) => {
    //adding the undefined as a sign that this was working on the teacher locally though i had not defined.
    res.status(404).render('404', {pageTitle: 'Page Not Found!!!', path: undefined});
});

app.listen(3000);

