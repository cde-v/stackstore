//using req.user.cart instead of an in url
//all of these routes assume a logged in user

var router = require('express').Router();
var Cart = require('mongoose').model('Cart');
var Order = require('mongoose').model('Order');

router.param('id', function(req, res, next, id) {
  Cart.findById(id).exec()
    .then(function(cart) {
      if (!cart) throw HttpError(404);
      req.cart = cart;
      next();
    })
    .then(null, function(err) {
      res.sendStatus(500);
    });
});

//should be admin only
router.get('/', function(req, res) {
  Cart.find({})
    .then(results => res.json(results))
    .catch(console.error);
});

router.get('/:id', function(req, res) {
  res.json(req.cart);
});

router.post('/', function(req, res) {
  Cart.create({}).then(result => {
    result.save();
    res.json(result);
  });
});

/* IN PROGRESS */
router.post('/:id/checkout', function(req, res) {
  //processing payment info
  //validation of req.user.cart with cart id

  var toPurchase = [];
  var price = 0;
  Cart.findOne({_id:req.params.id})
    .populate('items.product')
    .exec((error, cart) => cart)
    .then(cart => {
      cart.items.forEach(item =>{
        if(item.product.sizes.indexOf(item.size) > -1) {
          price += item.product.price;
          toPurchase.push(item);
        }
      });
      
      Order.create({
        items: toPurchase,
        orderStatus: 'created',
        user: req.user._id
        // total: price  **** add price here?
      });


    }).catch(()=>res.sendStatus(500));
});

router.put('/:id/:itemId', function(req, res) {
  res.json(req.cart.editQuantity(req.params.itemId, req.body.quantity));
});

router.delete('/:id/:itemId', function(req, res) {
  req.cart.removeItem(req.params.itemId);
  res.json(req.cart);
});

router.delete('/:id', function(req, res) {
  req.cart.items = [];
  req.cart.save();
  res.json(req.cart);
});

module.exports = router;
