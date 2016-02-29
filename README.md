# stackstore
PLANNING
DATA/MODELS

-Users{
	-types{
		-guest
		-email
		-google
		-fbook
	}
	-Cart{
		-USER
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
	-Reviews
	-Desc
	-num prev orders/popul

	
}
-Reviews{
	Rating
	products
	author
	text/review
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
	-Return Eligibility

}
-Returns{
	-request
	-received
	-cancled
	-refunded
}


-Admin
