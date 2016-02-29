var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
}); 

cartSchema.methods.checkOut = function(){};

cartSchema.methods.editQuantity = function (id, qty) {};

cartSchema.methods.removeItem = function(id) {};

cartSchema.methods.clearCart = function(){};

cartSchema.methods.getTotal = function(){};

module.exports = mongoose.model('Cart', cartSchema);