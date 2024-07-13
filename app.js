const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
// const expressHbs = require('express-handlebars');z

const app = express();

// app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})); // importing and setting up Handlebars.
// app.set('view engine', 'pug'); // setting a global configuration value.
app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');


// this middleware in only for parsing body from request and responses.
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // grant read access to a folder

app.use('/admin', adminData.route);
app.use(shopRouter);


app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    //adding the undefined as a sign that this was working on the teacher locally though i had not defined.
    res.status(404).render('404', {pageTitle: 'Page Not Found!!!', path: undefined});
});



app.listen(3000);

