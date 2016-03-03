//using req.user.cart instead of an in url
//all of these routes assume a logged in user

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
router.get('/allcarts', function(req, res) {
  Cart.find({})
    .then(results => res.json(results))
    .catch(console.error);
});

router.get('/', function(req, res) {
  Cart.find({ _id: req.user.cart })
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
router.post('/checkout', function(req, res) {
  //processing payment info
  var shipAddress = req.body.shipAddress;
  var billAddress = req.body.billAddress;
  var toPurchase = [];
  // var price = 0;
  Cart.findOne({ _id: req.user.cart })
    .populate('items.product')
    .exec((error, cart) => cart)
    .then(cart => {
      cart.items.forEach(item => {
        if (item.product.sizes[item.size]) {
          // price += item.product.price;
          toPurchase.push({
            itemId: item.product.itemId,
            brand: item.product.brand,
            name: item.product.name,
            price: item.product.price,
            size: item.size,
            quantity: item.quantity
          });

          item.product.sizes[item.size]--;
          item.product.save();
        }
      });

      return Order.create({
        items: toPurchase,
        orderStatus: 'created',
        userId: req.user._id,
        shipAddress: shipAddress,
        billAddress: billAddress
          // total: price  **** add price here?
      });
    }).then(order => {
      cart.items = [];
      cart.save();
      res.send(order);
    }).catch(err => res.sendStatus(500));
});

router.put('/:itemId', function(req, res) {
  Cart.find({ _id: req.user.cart })
    .then(cart => {
      res.json(cart.editQuantity(req.params.itemId, req.body.size, req.body.quantity));
    });
});

router.delete('/:itemId/:size', function(req, res) {
  Cart.find({ _id: req.user.cart })
    .then(cart => {
      cart.removeItem(req.params.itemId, req.params.size);
      res.json(cart);
    });
});

router.delete('/', function(req, res) {
  Cart.find({ _id: req.user.cart })
    .then(cart => {
      cart.items = [];
      cart.save();
      res.json(cart);
    });
});

module.exports = router;
