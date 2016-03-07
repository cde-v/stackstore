'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/cart', require('./carts/index.js'));
router.use('/products', require('./products/products.js'));
router.use('/users', require('./users/users.js'));
router.use('/reviews', require('./reviews.js'));
router.use('/orders', require('./order.js'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
