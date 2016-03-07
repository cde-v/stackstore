var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  session: { type: String },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    size: {type: Number},
    quantity: { type: Number },
    _id: false
  }]
});

cartSchema.methods.addLocalCart = function(itemsFromLocal){
  var cart = this;
  itemsFromLocal.forEach(function(item){
    cart.editQuantity(item.product._id, item.size, item.qty);
  });
  return cart.save();
};

cartSchema.methods.editQuantity = function(id, size, qty) {
  var cart = this;
  var found = false;

  if (!qty) cart.removeItem(id, size);
  else {
    cart.items.forEach(function(item) {
      if (item.product.toString() == id.toString() && item.size === +size) {
        item.quantity = qty;
        found = true;
      }
    });

    if (!found) cart.items.push({ product: id, quantity: qty, size: size });
  }

  return cart.save();
};

cartSchema.methods.removeItem = function(id, size) {
  var cart = this;
  var idx = -1;

  cart.items.forEach(function(item, ind) {
    if (item.product.toString() == id && item.size === +size) idx = ind;
  });

  if (idx >= 0) cart.items.splice(idx, 1);

  return cart.save();
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
