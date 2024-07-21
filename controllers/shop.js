const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll( (products) => { // (products being the callback function from the model/product.)
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/',
        });  // it will use the default template engine defined at app.js app.set.
    });
    console.log('Shopping cart --> ', products);
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId; // same variable name from router declaration router.get('/products/:productId')
    console.log(prodId);

    Product.findById(prodId, product => {
        // console.log(product);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title, // need to add this because the includes files use it.
            path: '/products' // same above.

        });
    });

}

exports.getIndex = (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        }); 
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