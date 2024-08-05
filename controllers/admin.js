const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    // create an associate object. this method exist because of app.js Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        console.log('Product has been created ' + result.title);
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });   
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        res.redirect('/');
    }
    const prodId = req.params.productId;

    req.user.getProducts({ where: { id: prodId } }) // will return array of objects.
        .then(products => {
            const product = products[0];

            if(!product) {
                res.redirect('/');
            }

            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
        
            });

    }).catch(err => {
        console.log(err);
    });  
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    Product.findByPk(prodId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl;

        return product.save();
    }).then(result => {
        console.log('Product ' + result.id + ' has been updated.');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });  
}

exports.getProducts = (req, res, next) => {

    req.user.getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
            }); 
        }).catch(err => {
            console.log(err);
    }); 
}


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findByPk(prodId).then(product => {
        // sequelize version for deleteById
        return product.destroy();

    }).then(result => {
        console.log('Product ' + result.id + ' has been deleted.');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });  
}