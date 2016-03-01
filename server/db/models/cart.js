var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  session: { type: String },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number }
  }]
});

cartSchema.methods.editQuantity = function(id, qty) {
  var cart = this;
  var found = false;

  cart.items.forEach(function(item) {
    if (item._id == id) {
      item.quantity = +qty;
      found = true;
    }
  });

  if (!found) cart.items.push({ product: id, quantity: +qty });

  cart.save();
  return cart;
};

cartSchema.methods.removeItem = function(id) {
  var cart = this;

  cart.items.forEach(function(item, ind) {
    if (item.product === id) cart.items.splice(ind, 1);
  });

  cart.save();
  return cart;
};

cartSchema.methods.getTotal = function() {
  var cart = this;
  cart.populate('items');
  return cart.items.reduce(function(prev, curr) {
    return prev + curr.price;
  }, 0);
};

module.exports = mongoose.model('Cart', cartSchema);
