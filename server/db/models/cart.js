var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	session: {type: string},
	items: [{product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
			quantity: {type: Number}
	}]
}); 

cartSchema.methods.checkOut = function(){
	//route?
};

cartSchema.methods.editQuantity = function (id, qty) {
	var cart = this;

	cart.items.forEach(function(item){
		if(item.product == id) item.quantity = qty;
	});
};

cartSchema.methods.removeItem = function(id) {
	var cart = this;

	cart.items.forEach(function(item, ind){
		if(item.product == id) cart.items.splice(ind, 1);
	});
};

cartSchema.methods.clearCart = function(){
	//route?
};

cartSchema.methods.getTotal = function(){
	var cart = this;
	cart.populate('items');
	return cart.items.reduce(function(prev, curr){
		return prev + curr.price;
	}, 0);
};

mongoose.model('Cart', cartSchema);