var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));

var seedProducts = function () {

    var shoes = [
        {
            itemId: 'ADYB350B',
            brand:'Adidas',
            style:'sneaker',
            name:'Yeezy Boost 350 Black',
            images: ['img1','img2'],
            price: 500,
            prevOrders: 2,
            sizes: {
                6:3,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','black','sneaker'],
            description: 'Made of pure gold'
        },{
            itemId: 'ADYB350T',
            brand:'Adidas',
            style:'sneaker',
            name:'Yeezy Boost 350 Tan',
            images: ['img1','img2'],
            price: 500,
            prevOrders: 2,
            sizes: {
                6:3,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','tan','sneaker'],
            description: 'Made of pure gold'
        },{
            itemId: 'ADYB350W',
            brand:'Adidas',
            style:'sneaker',
            name:'Yeezy Boost 350 White',
            images: ['img1','img2'],
            price: 500,
            prevOrders: 2,
            sizes: {
                6:3,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','white','sneaker'],
            description: 'Made of pure gold'
        },{
            itemId: 'ADYB750B',
            brand:'Adidas',
            style:'sneaker',
            name:'Yeezy Boost 750 Black',
            images: ['img1','img2'],
            price: 800,
            prevOrders: 2,
            sizes: {
                6:3,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','black','sneaker'],
            description: 'Made of pure gold'
        },{
            itemId: 'ADYB750G',
            brand:'Adidas',
            style:'sneaker',
            name:'Yeezy Boost 750 Gray',
            images: ['img1','img2'],
            price: 800,
            prevOrders: 2,
            sizes: {
                6:3,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','gray','sneaker'],
            description: 'Made of pure gold'
        },{
            itemId: 'NKAYB',
            brand:'Nike',
            style:'sneaker',
            name:'Air Yeezy Black',
            images: ['img1','img2'],
            price: 1500,
            prevOrders: 2,
            sizes: {
                6:3,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','black','sneaker'],
            description: 'Made of pure gold'
        },{
            itemId: 'NKAYT',
            brand:'Nike',
            style:'sneaker',
            name:'Air Yeezy Tan',
            images: ['img1','img2'],
            price: 1500,
            prevOrders: 2,
            sizes: {
                6:3,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','tan','sneaker'],
            description: 'Made of pure gold'
        },{
            itemId: 'NKAYG',
            brand:'Nike',
            style:'sneaker',
            name:'Air Yeezy Gray',
            images: ['img1','img2'],
            price: 1500,
            prevOrders: 2,
            sizes: {
                6:3,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','gray','sneaker'],
            description: 'Made of pure gold'
        }
        
    ];

    return Product.createAsync(shoes);

};

connectToDb.then(function () {
    Product.findAsync({}).then(function (products) {
        if (products.length === 0) {
            return seedProducts();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
