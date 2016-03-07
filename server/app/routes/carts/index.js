//using req.user.cart instead of an in url
//all of these routes assume a logged in user
//change back to user

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_LZflzAqVPpPjfSo0c9rXPMLZ");
var chalk=require('chalk')
var router = require('express').Router();
var Cart = require('mongoose').model('Cart');
var Order = require('mongoose').model('Order');
var Product = require('mongoose').model('Product');
var Promise = require('Bluebird');
router.param('id', function(req, res, next, id) {
  Cart.findById(id).exec()
    .then(function(cart) {
      if (!cart) next(new Error("Cart Not Found!"));
      req.cart = cart;
      next();
    })
    .then(null, next);
});
//should be admin only
router.get('/', function(req, res, next) {
  Cart.find({})
    .then(results => res.json(results))
    .then(null, next);
});
router.get('/:id', function(req, res, next) {
  Cart.findById(req.params.id)
    .populate('items.product')
    .then(cart => {
      res.json(cart);
    }, next);
});
// changing from local cart to db cart
router.post('/', function(req, res, next) {
  var items = req.body.items;
  Cart.create({ user: req.user._id, items: items })
    .then(result => {
      res.json(result);
    }, next);
});

router.put('/:id/:itemId', function(req, res) {
    req.cart.editQuantity(req.params.itemId, req.body.size, req.body.quantity)
      .then(saved => {
        return Cart.findById(saved._id)
        .populate('items.product');
      }).then(popCart => res.json(popCart));
});

router.delete('/:id/:itemId/:size', function(req, res, next) {
    req.cart.removeItem(req.params.itemId, req.params.size)
    .then(saved => {
        return Cart.findById(saved._id)
        .populate('items.product');
      }).then(popCart => res.json(popCart))
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
    req.cart.items = [];
    req.cart.save().then(saved => res.json(saved), next);
});

router.post('/checkout', function(req, res, next){
  //req.body = {shipAddress: ..., billAddress: ..., cart: ...}
  var productPromises = [];
  var token = req.body.token;
  var cart = req.body.cart;
  var toPurchase = [];
  var user = "";
  if(req.user) user = req.user._id;

  cart.forEach(function(item){
    productPromises.push(Product.findById(item.product._id).exec());
  });

  Promise.all(productPromises)
    .then(promiseArray => {
      var price = 0;
      promiseArray.forEach(function(product, ind){
        console.log(product.sizes[cart[ind].size], +cart[ind].quantity)
        if(product.sizes[cart[ind].size] >= +cart[ind].quantity){
          toPurchase.push({
            itemId: product.itemId,
            brand: product.brand,
            name: product.name,
            price: +product.price,
            size: +cart[ind].size,
            quantity: +cart[ind].quantity
          });
          price += product.price;
          product.sizes[cart[ind].size] -= +cart[ind].quantity;
          product.save();
        }
      });

      //Promise.join(price, arrayOfSaved)
        
      return price;
    }).then(price =>{
      return stripe.charges.create({
        amount: price, // amount in cents, again
        currency: "usd",
        source: token,
        description: "Example charge"
      })
    }).then(charge => {
      return Order.create({
        userId: user,
        items: toPurchase,
        orderStatus: 'created',
        shipAddress: req.body.shipAddress,
        billAddress: req.body.billAddress
        });
    }, next).then(newOrder => res.json(newOrder)
    ).then(null, next);
});

module.exports = router;
