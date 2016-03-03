//using req.user.cart instead of an in url
//all of these routes assume a logged in user
//change back to user

var router = require('express').Router();
var Cart = require('mongoose').model('Cart');
var Order = require('mongoose').model('Order');

router.param('id', function(req, res, next, id) {
  Cart.findById(id).exec()
    .then(function(cart) {
      if (!cart) res.sendStatus(500);
      req.cart = cart;
      next();
    })
    .then(null, function(err) {
      throw new Error(err);
    });
});

//should be admin only
router.get('/', function(req, res) {
  Cart.find({})
    .then(results => res.json(results))
    .catch(console.error);
});

router.get('/:id', function(req, res) {
  Cart.findById(req.params.id)
    .populate('items.product')
    .exec(function(error, popCart){
      return popCart;
    })
    .then(cart => {
      res.json(cart);
    });
});

// changing from local cart to db cart
router.post('/', function(req, res) {
  var items = req.body.items;
  Cart.create({ user: req.user._id, items: items })
    .then(result => {
      result.save();
      res.json(result);
    });
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

          item.product.sizes[item.size]--;
          item.product.save();
        }
      });

      return Order.create({
        items: toPurchase,
        orderStatus: 'created',
        shipAddress: shipAddress,
        billAddress: billAddress
      });
    }).then(order => {
      cart1.items = [];
      cart1.save();
      res.json(order);
    }).catch(err => res.sendStatus(500));
});

router.put('/:id/:itemId', function(req, res) {
    req.cart.editQuantity(req.params.itemId, req.body.size, req.body.quantity);
    res.json(req.cart);
});

router.delete('/:id/:itemId/:size', function(req, res) {
    req.cart.removeItem(req.params.itemId, req.params.size);
    res.json(req.cart);
});

router.delete('/:id', function(req, res) {
    req.cart.items = [];
    cart.save();
    res.json(cart);
});

module.exports = router;
