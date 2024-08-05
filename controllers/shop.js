const Product = require('../models/product');

exports.getProducts = (req, res, next) => {

    Product.findAll().then(products => {
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

//With Sequelize v5, findById() (which we'll use in this course) was replaced by findByPk().
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId; // same variable name from router declaration router.get('/products/:productId')
    console.log(prodId);

    Product.findByPk(prodId).then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title, 
            path: '/products'

        });
    }).catch(err => {
        console.log(err);
    });

    // another cheeky approach.
    // Product.findAll({where: { id: prodId }}).then(products => {
    //         res.render('shop/product-detail', {
    //             product: products[0],
    //             pageTitle: products[0].title, 
    //             path: '/products'
    
    //         });
    //     }).catch(err => {
    //         console.log(err);
    //     });


}

exports.getIndex = (req, res, next) => {
    // findAll() from sequelize.
    Product.findAll().then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        }); 
    }).catch(err => {
        console.log(err);
    });

}

exports.getCart = (req, res, next) => {

    req.user.getCart()
        .then( cart => {

            return cart.getProducts().then( products => {
                res.render('shop/cart', {
                            path: '/cart',
                            pageTitle: 'Your Cart',
                            products: products
                });

            }).catch(err => {
                console.log(err);
            });;

        }).catch(err => {
            console.log(err);
        });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId; // as is written at the product detail ejs.
    let fetchedCart;
    let newQnt = 1;

    req.user.getCart()
    .then( cart => {
        fetchedCart = cart;
        return cart.getProducts( { where: { id: prodId }});
    }).then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }
        
        if(product) {
            const oldQuantity = product.cartItem.quantity;
            newQnt = oldQuantity + 1;
            return product;
        }

        return Product.findByPk(prodId);
    }).then(product => {
        return fetchedCart.addProduct(product, { through: { quantity: newQnt } });

    }).then(() => {
        res.redirect('/cart');
    }).catch(err => {
        console.log(err);
    });

  
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user.getCart()
    .then(cart => {
        return cart.getProducts( { where: { id: prodId }})
    }).then(products => {
        const product = products[0];
       return product.cartItem.destroy();
    }).then(result => {
        res.redirect('/cart');
    }).catch(err => {
        console.log(err);
    });
   
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;

    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts()
    }).then(products => {
       return req.user.createOrder().then(
            order => {
                return order.addProducts(products.map(product => {
                    product.orderItem = { quantity: product.cartItem.quantity };
                    return product;
                })) // map() raw js,...
            })
    }).then(() => {
        fetchedCart.setProducts(null);
    }).then(result => {
        res.redirect('/orders');
    }).catch(err => {
        console.log(err);
    });
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']}) // eager loading... because of Order belongsToMany Product at app.js
    .then( orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    })
    .catch(err => {
        console.log(err);
    });;
    
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}