/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var chance = require('chance')(123);
var connectToDb = require('./server/db');
var Order = Promise.promisifyAll(mongoose.model('Order'));

var seedOrders = function() {

  var orders = [{
    userId: "56ddf4315601f7074ba7563c",
    shipAddress: {
     name: 'Jane Brown',
     address1: '123 Bridge Ln',
     city: 'Springfield',
     state:'MA',
     zip: '03948'
   },
   billAddress: {
     name: 'Jane Brown',
     address1: '123 Bridge Ln',
     city: 'Springfield',
     state:'MA',
     zip: '03948'
   },
   status: 'Created',
   orderDate: 'March 2, 2016',
   items: [{
    itemId: 'ADYB350B',
    brand: 'Adidas',
    name: 'Yeezy Boost 350 Black',
    quantity: 2,
    price: 500,
    size: 10
  }, {
    itemId: 'ADYB350T',
    brand: 'Adidas',
    name: 'Yeezy Boost 350 Tan',
    quantity: 1,
    price: 500,
    size: 6
  }]
},

{
  userId: "56ddf4315601f7074ba7563c",
  shipAddress: {
   name: 'Jane Brown',
   address1: '123 Bridge Ln',
   city: 'Springfield',
   state:'MA',
   zip: '03948'
 },
 billAddress: {
   name: 'Jane Brown',
   address1: '123 Bridge Ln',
   city: 'Springfield',
   state:'MA',
   zip: '03948'
 },
 status: 'Processing',
 orderDate: 'February 3, 2016',
 items: [{
  itemId: 'ADYB140G',
  brand: 'Nike',
  name: 'Jeezy Joost 140 Gray',
  quantity: 1,
  price: chance.integer({
    min: 50,
    max: 1000
  }),
  size: chance.integer({
    min: 6,
    max: 14
  })
}]
}, {
  userId: "56ddf4315601f7074ba7563c",
  shipAddress: {
   name: 'Jane Brown',
   address1: '123 Bridge Ln',
   city: 'Springfield',
   state:'MA',
   zip: '03948'
 },
 billAddress: {
   name: 'Jane Brown',
   address1: '123 Bridge Ln',
   city: 'Springfield',
   state:'MA',
   zip: '03948'
 },
 items: [{
  itemId: 'ADYB640T',
  brand: 'Adidas',
  name: 'Yeezy Boost 640 Tan',
  quantity: 1,
  price: chance.integer({
    min: 50,
    max: 1000
  }),
  size: chance.integer({
    min: 6,
    max: 14
  }),
}],
items: [{
  itemId: 'ADYB140G',
  brand: 'Nike',
  name: 'Jeezy Joost 140 Gray',
  quantity: 1,
  price: chance.integer({
    min: 50,
    max: 1000
  }),
  size: chance.integer({
    min: 6,
    max: 14
  })
}],
status: 'Canceled',
orderDate: 'February 1, 2016',
},

{
  userId: "56ddf4315601f7074ba7563c",
  shipAddress: {
    name: 'Ann Doe',
    address1: '343 Dog Dr',
    address2: '#2',
    city: 'Hilton',
    state:'NJ',
    zip: '03348'
  },
  billAddress: {
    name: 'Jane Brown',
    address1: '123 Bridge Ln',
    city: 'Springfield',
    state:'MA',
    zip: '03948'
  },
  status: 'Shipped',
  items: [{
    itemId: 'ADYB140G',
    brand: 'Nike',
    name: 'Jeezy Joost 140 Gray',
    quantity: 1,
    price: chance.integer({
      min: 50,
      max: 1000
    }),
    size: chance.integer({
      min: 6,
      max: 14
    })
  }],
  orderDate: 'March 1, 2016',
  shipDate: 'March 3, 2016',
},

{
  userId: "56ddf4315601f7074ba7563c",
  shipAddress: {
   name: 'Jane Brown',
   address1: '123 Bridge Ln',
   city: 'Springfield',
   state:'MA',
   zip: '03948'
 },
 billAddress: {
   name: 'Jane Brown',
   address1: '123 Bridge Ln',
   city: 'Springfield',
   state:'MA',
   zip: '03948'
 },
 status: 'Fulfilled',
 items: [{
  itemId: 'ADYB140G',
  brand: 'Nike',
  name: 'Jeezy Joost 140 Gray',
  quantity: 1,
  price: chance.integer({
    min: 50,
    max: 1000
  }),
  size: chance.integer({
    min: 6,
    max: 14
  })
}],
orderDate: 'January 10, 2016',
shipDate: 'January 14, 2016'
}, {
  userId: "56ddf4315601f7074ba7563c",
  shipAddress:{
    name: 'Alex Green',
    address1: '456 Hollow St',
    address2: '#5',
    city: 'Springfield',
    state:'NY',
    zip: '11304'
  },
  billAddress: {
    name: 'Alex Green',
    address1: '456 Hollow St',
    address2: '#5',
    city: 'Springfield',
    state:'NY',
    zip: '11304'
  },
  status: 'Fulfilled',
  items: [{
    itemId: 'ADYB140G',
    brand: 'Nike',
    name: 'Jeezy Joost 140 Gray',
    quantity: 1,
    price: chance.integer({
      min: 50,
      max: 1000
    }),
    size: chance.integer({
      min: 6,
      max: 14
    })
  }],
  orderDate: 'January 20, 2016',
  shipDate: 'January 22, 2016'
}, {
  userId: "56ddf4315601f7074ba7563c",
  shipAddress: {
    name: 'Alex Green',
    address1: '456 Hollow St',
    address2: '#5',
    city: 'Springfield',
    state:'NY',
    zip: '11304'
  },
  billAddress: {
    name: 'Alex Green',
    address1: '456 Hollow St',
    address2: '#5',
    city: 'Springfield',
    state:'NY',
    zip: '11304'
  },
  status: 'Fulfilled',
  items: [{
    itemId: 'ADYB140G',
    brand: 'Nike',
    name: 'Jeezy Joost 140 Gray',
    quantity: 1,
    price: chance.integer({
      min: 50,
      max: 1000
    }),
    size: chance.integer({
      min: 6,
      max: 14
    })
  }],
  orderDate: 'February 28, 2016',
  shipDate: 'March 1, 2016'
}, {
  userId: "56ddf4315601f7074ba7563c",
  shipAddress: {
    name: 'Ryan Green',
    address1: '7588 Hello Ln',
    city: 'Albany',
    state:'NY',
    zip: '13334'
  },
  billAddress: {
    name: 'Alex Green',
    address1: '456 Hollow St',
    address2: '#5',
    city: 'Springfield',
    state:'NY',
    zip: '11304'
  },
  status: 'Fulfilled',
  items: [{
    itemId: 'ADYB140G',
    brand: 'Nike',
    name: 'Jeezy Joost 140 Gray',
    quantity: 1,
    price: chance.integer({
      min: 50,
      max: 1000
    }),
    size: chance.integer({
      min: 6,
      max: 14
    })
  }],
  orderDate: 'February 26, 2016',
  shipDate: 'February 29, 2016'
}
]
return Order.createAsync(orders);
}

connectToDb.then(function() {
  Order.findAsync({}).then(function(orders) {
    return seedOrders();
  }).then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  }).catch(function(err) {
    console.error(err);
    process.kill(1);
  });
});

