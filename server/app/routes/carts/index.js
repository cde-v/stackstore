//using req.user.cart instead of an in url
//all of these routes assume a logged in user
//change back to user

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

router.get('/:id', function(req, res) {
  Cart.findById(req.params.id)
    .populate('items.product')
    .exec(function(error, popCart){
      return popCart;
    })
    .then(cart => {
      res.json(cart);
    }, next);
});

// changing from local cart to db cart
router.post('/', function(req, res) {
  var items = req.body.items;
  Cart.create({ user: req.user._id, items: items })
    .then(result => {
      res.json(result);
    }, next);
});

router.post('/checkoutGuest', function(req, res, next){
  //req.body = {shipAddress: ..., billAddress: ..., cart: ...}
  var productPromises = [];
  var cart = req.body.cart;

  cart.items.forEach(function(item){
    productPromises.push(Product.findById(item.product._id));
  });

  Promise.all(productPromises)
    .then(promiseArray => {
      var toPurchase = []
      promiseArray.forEach(function(product, ind){
        if(product.sizes[cart.items[ind].size]){
          toPurchase.push({
            itemId: product.itemId,
            brand: product.brand,
            name: product.name,
            price: +product.price,
            size: +size,
            quantity: +quantity
          });

          product.sizes[cart.items[ind].size] -= cart.items[ind].quantity;
          product.save();
        }
      });
      return toPurchase;
    }).then(toPurchase => {
      return Order.create({
        items: toPurchase,
        orderStatus: 'created',
        shipAddress: req.body.shipAddress,
        billAddress: req.body.billAddress
        });
    }).then(newOrder => res.json(newOrder)
    ).then(null, next);

});

/* IN PROGRESS */
router.post('/:id/checkout', function(req, res) {
  //processing payment info
  var shipAddress = req.body.shipAddress;
  var billAddress = req.body.billAddress;
  var toPurchase = [];
  var cart1;
  // var price = 0;
  Cart.findById(req.params.id)
    .populate('items.product')
    .exec((error, cart) => cart)
    .then(cart => {
      cart1 = cart;
      cart.items.forEach(item => {
        if (item.product.sizes[item.size]) {
          // price += item.product.price;
          toPurchase.push({
            itemId: item.product.itemId,
            brand: item.product.brand,
            name: item.product.name,
            price: +item.product.price,
            size: +item.size,
            quantity: +item.quantity
          });

          item.product.sizes[item.size]-=item.quantity;
          item.product.save();
        }
      });

      return Order.create({
        items: toPurchase,
        orderStatus: 'created',
        shipAddress: shipAddress,
        billAddress: billAddress,
        userId: req.user._id
        //userId?
      });
    }).then(order => {
      res.json(order);
      cart1.items = [];
      return cart1.save();
    }).catch(err => res.sendStatus(500));
});

router.put('/:id/:itemId', function(req, res) {
    req.cart.editQuantity(req.params.itemId, req.body.size, req.body.quantity);
    res.json(req.cart);
});

router.delete('/:id/:itemId/:size', function(req, res) {
    req.cart.removeItem(req.params.itemId, req.params.size)
    .then(saved => res.json(req.cart), next);
});

router.delete('/:id', function(req, res) {
    req.cart.items = [];
    cart.save().then(saved => res.json(cart), next);
});

module.exports = router;
