const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {

    Product.fetchAll()
    .then( ([products]) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/products',
        });

        console.log('Shopping cart --> ', products); // name could be rows.

    }).catch(err => {
        console.log(err);
    });    
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId; // same variable name from router declaration router.get('/products/:productId')
    console.log(prodId);

    Product.findById(prodId)
        .then(([product]) => {  // attention to this ([resultSet]) syntax
            res.render('shop/product-detail', {
                product: product[0], // ugly as hell but that all right
                pageTitle: product.title, 
                path: '/products'

            });
        }).catch(err => {
            console.log(err);
        })
}

exports.getIndex = (req, res, next) => {

    Product.fetchAll()
        .then( ([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/',
            }); 

        }).catch(err => {
            console.log(err);
        });
}

exports.getCart = (req, res, next) => {

    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData){
                    cartProducts.push({productData: product, qnt: cartProductData.qnt });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });

    
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId; // as is written at the product detail ejs.
    Product.findById(prodId, (product) => {
        Cart.addProduct(product.id, product.price);
    });
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
   
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}