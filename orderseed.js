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
      userId: 1,
      shipAddress: '123 Bridge Ln Springfield, MA 03948',
      billAddress: '123 Bridge Ln Springfield, MA 03948',
      orderStatus: 'created',
      orderDate: '2016-03-02T02:54:29.202Z',
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
      userId: 1,
      shipAddress: '123 Bridge Ln Springfield, MA 03948',
      billAddress: '123 Bridge Ln Springfield, MA 03948',
      orderStatus: 'processing',
      orderDate: '2016-03-01T02:55:29.202Z',
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
      userId: 1,
      shipAddress: '123 Bridge Ln Springfield, MA 03948',
      billAddress: '123 Bridge Ln Springfield, MA 03948',
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
      orderStatus: 'canceled',
      orderDate: chance.date({
        year: 2016,
        month: 2
      })
    },

    {
      userId: 1,
      shipAddress: '123 Bridge Ln Springfield, MA 03948',
      billAddress: '343 Dog Dr Hilton, NJ 03348',
      orderStatus: 'shipped',
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
      orderDate: '2016-03-01T02:54:29.202Z',
      shipDate: chance.date({
        year: 2016,
        month: 3
      })
    },

    {
      userId: 1,
      shipAddress: '123 Bridge Ln Springfield, MA 03948',
      billAddress: '123 Bridge Ln Springfield, MA 03948',
      orderStatus: 'fulfilled',
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
      orderDate: chance.date({
        year: 2016,
        month: 1
      }),
      shipDate: chance.date({
        year: 2016,
        month: 2
      })
    }, {
      userId: 2,
      shipAddress: '456 Hollow St Springfield, NY 11304',
      billAddress: '456 Hollow St Springfield, NY 11304',
      orderStatus: 'fulfilled',
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
      orderDate: chance.date({
        year: 2016,
        month: 1
      }),
      shipDate: chance.date({
        year: 2016,
        month: 2
      })
    }, {
      userId: 2,
      shipAddress: '456 Hollow St Springfield, NY 11304',
      billAddress: '456 Hollow St Springfield, NY 11304',
      orderStatus: 'fulfilled',
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
      orderDate: chance.date({
        year: 2016,
        month: 1
      }),
      shipDate: chance.date({
        year: 2016,
        month: 2
      })
    }, {
      userId: 2,
      shipAddress: '7588 Hello Ln Albany, NY 13334',
      billAddress: '456 Hollow St Springfield, NY 11304',
      orderStatus: 'fulfilled',
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
      orderDate: chance.date({
        year: 2016,
        month: 1
      }),
      shipDate: chance.date({
        year: 2016,
        month: 2
      })
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

