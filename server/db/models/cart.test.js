var expect = require('chai').expect,
	Cart = require('mongoose').model('Cart');

describe('Cart', function(){

	it('has an array list');
	it('has a user');
	it('can edit the quantity of a product');
	it('can remove a product from the cart');
	it('can not remove something that is not there');
	it('can calculate a total price of the cart');

});