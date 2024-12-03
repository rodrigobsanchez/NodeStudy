const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');


// this middleware in only for parsing body from request and responses.
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // grant read access to public folder

app.use((req, res, next) => {
    User.findById('674e68feb990f0765857977f')
        .then(user => {
            // console.log(user);
            req.user = new User(user.name, user.email, user.cart, user._id); // adding a new att to the request (req).
            next();
        }).catch(err => {
            console.log(err);
        });
});

app.use('/admin', adminRoutes);
app.use(shopRouter);


app.use(errorController.get404);

mongoConnect(() => { 

    app.listen(3000);
});




