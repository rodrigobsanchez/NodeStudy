const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


// this middleware in only for parsing body from request and responses.
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // grant read access to public folder

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user // adding a new att to the request (req).
        next();
    }).catch(err => {
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRouter);


app.use(errorController.get404);

// creating a JOIN.
Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });
User.hasMany(Product); // creating ManyToOne...

// then below it will create relations..

// more relations... CarItem with the through means the reference tables.
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem});

// sync my models into the database. Creating tables or updating them.
sequelize
    // .sync({ force: true})
    .sync()
    .then(result => {
        // console.log(result); loggs the sync 
        return User.findByPk(1);
    
    
    }).then(user => {
        if (!user) {
            User.create({ name: "Default User", email: "hey@email.com"});
        }
        return user;
    }).then(user => {
        // console.log(user);
        user.createCart();

    }).then(user => {
        app.listen(3000); // starting server.

    }).catch(err => {
        console.log(err);
    });



