var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Reviews = Promise.promisifyAll(mongoose.model('Reviews'));

var seedProducts = function () {

    var shoes = [
        {
            itemId: 'ADYB350B',
            department:'mens',
            brand:'Adidas',
            style:'sneaker',
            name:'Yeezy Boost 350 Black',
            images: ['img/product/Yeezy-Boost-350-b.jpg','img2'],
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
            department:'mens',
            brand:'Adidas',
            style:'sneaker',
            name:'Yeezy Boost 350 Tan',
            images: ['img/product/Yeezy-Boost-350-t.jpg','img2'],
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
            department:'mens',
            brand:'Adidas',
            style:'sneaker',
            name:'Yeezy Boost 350 White',
            images: ['img/product/Yeezy-Boost-350-w.jpg','img2'],
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
            department:'mens',
            brand:'Adidas',
            style:'sneaker',
            name:'Yeezy Boost 750 Black',
            images: ['img/product/Yeezy-Boost-750-b.jpg','img2'],
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
            department:'mens',
            brand:'Adidas',
            style:'sneaker',
            name:'Yeezy Boost 750 Gray',
            images: ['img/product/Yeezy-Boost-750-g.jpg','img2'],
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
            department:'mens',
            brand:'Nike',
            style:'sneaker',
            name:'Air Yeezy Black',
            images: ['img/product/Yeezy-Air-b.jpg','img2'],
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
            department:'mens',
            brand:'Nike',
            style:'sneaker',
            name:'Air Yeezy Tan',
            images: ['img/product/Yeezy-Air-t.jpg','img2'],
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
            department:'mens',
            brand:'Nike',
            style:'sneaker',
            name:'Air Yeezy Gray',
            images: ['img/product/Yeezy-Air-g.jpg','img2'],
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


