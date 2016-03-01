DATA/MODELS

-Users{
	-_id
	-types{
		-guest
		-email
		-google
		-fbook
	}
	-Cart._id
	-Account{
		personal info
			-name
			-address
				-ship
				-bill
			-phn num
			-email
			-payment info
		-order history
	}

}

-Orders{
	-Users
		-cart
	-status
		-placed
		-processing
		-ready
		-shipped
		-fulfilled
		-cancled
		-error
	-Returns{
		-request
		-received
		-cancled
		-refunded
	}

}

-Cart{
	-_id
	-USER._id
	-product-info
	-Actions{
		-CHECKOUT
		-edit quantity
		-remove
	}
	-Total{
		sub
		tax
		opt fees
		shipping
		totl
	}
}
-products{
	info{
		-brand
		-name
		-pic
		-price
		-quantity
		-availability
		-option ex:size color etc
	}
	-Desc
	-num prev orders/popul
	-Reviews{
		Rating
		products
		author
		text/review
	}	
}



-Admin{

}
