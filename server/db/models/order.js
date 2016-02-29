var orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    status: {
        type: String,
        enum: ['created', 'processing', 'shipped', 'fulfilled', 'canceled', 'error']
    },
    returns: {
        type: String,
        enum: ['created', 'received', 'canceled', 'refunded']
    },
    date: {
    	type: Date,
    	default: Date.now
    }    
});

