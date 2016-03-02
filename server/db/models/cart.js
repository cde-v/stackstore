var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  session: { type: String },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    _id: false
  }]
});

cartSchema.methods.editQuantity = function(id, qty) {
  var cart = this;
  var found = false;

  if (!qty) cart.removeItem(id);
  else {
    cart.items.forEach(function(item) {
      if (item.product === id) {
        item.quantity = qty;
        found = true;
      }
    });

    if (!found) cart.items.push({ product: id, quantity: qty });
  }

  cart.save();

  return cart;
};

cartSchema.methods.removeItem = function(id) {
  var cart = this;
  var idx = -1;

  cart.items.forEach(function(item, ind) {
    if (item.product.toString() === id) idx = ind;
  });

  if (idx >= 0) cart.items.splice(idx, 1);
  cart.save();

  return cart;
};

cartSchema.statics.getTotal = function(id) {
  var carts = this;
  var total = 0;

  return carts.findOne({ _id: id })
    .populate('items.product')
    .exec(function(error, populatedCart) {
      return populatedCart;
    }).then(populatedCart => {
      populatedCart.items.forEach(function(item) {
        total += item.product.price;
      });
      return total;
    });

};

mongoose.model('Cart', cartSchema);
