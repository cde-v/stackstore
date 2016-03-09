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
            style:'Sneakers',
            name:'Yeezy Boost 350 Black',
            images: ['img/product/Yeezy-Boost-350-b.jpg','img2'],
            price: 500,
            prevOrders: 2,
            sizes: {
                6:99,
                7:0,
                8:99,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','black','Sneakers'],
            description: 'Designed by Kanye West'
        },{
            itemId: 'ADYB350T',
            department:'mens',
            brand:'Adidas',
            style:'Sneakers',
            name:'Yeezy Boost 350 Tan',
            images: ['img/product/Yeezy-Boost-350-t.jpg','img2'],
            price: 500,
            prevOrders: 2,
            sizes: {
                6:31,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','tan','Sneakers'],
            description: 'Designed by Kanye West'
        },{
            itemId: 'ADYB350W',
            department:'mens',
            brand:'Adidas',
            style:'Sneakers',
            name:'Yeezy Boost 350 White',
            images: ['img/product/Yeezy-Boost-350-w.jpg','img2'],
            price: 500,
            prevOrders: 2,
            sizes: {
                6:32,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','white','Sneakers'],
            description: 'Designed by Kanye West'
        },{
            itemId: 'ADYB750B',
            department:'mens',
            brand:'Adidas',
            style:'Sneakers',
            name:'Yeezy Boost 750 Black',
            images: ['img/product/Yeezy-Boost-750-b.jpg','img2'],
            price: 800,
            prevOrders: 2,
            sizes: {
                6:33,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','black','Sneakers'],
            description: 'Designed by Kanye West'
        },{
            itemId: 'ADYB750G',
            department:'mens',
            brand:'Adidas',
            style:'Sneakers',
            name:'Yeezy Boost 750 Gray',
            images: ['img/product/Yeezy-Boost-750-g.jpg','img2'],
            price: 800,
            prevOrders: 2,
            sizes: {
                6:34,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','gray','Sneakers'],
            description: 'Designed by Kanye West'
        },{
            itemId: 'NKAYB',
            department:'mens',
            brand:'Nike',
            style:'Sneakers',
            name:'Air Yeezy Black',
            images: ['img/product/Yeezy-Air-b.jpg','img2'],
            price: 1500,
            prevOrders: 2,
            sizes: {
                6:35,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','black','Sneakers'],
            description: 'Designed by Kanye West'
        },{
            itemId: 'NKAYT',
            department:'mens',
            brand:'Nike',
            style:'Sneakers',
            name:'Air Yeezy Tan',
            images: ['img/product/Yeezy-Air-t.jpg','img2'],
            price: 1500,
            prevOrders: 2,
            sizes: {
                6:36,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','tan','Sneakers'],
            description: 'Designed by Kanye West'
        },{
            itemId: 'NKAYG',
            department:'mens',
            brand:'Nike',
            style:'Sneakers',
            name:'Air Yeezy Gray',
            images: ['img/product/Yeezy-Air-g.jpg','img2'],
            price: 1500,
            prevOrders: 2,
            sizes: {
                6:37,
                7:0,
                8:2,
                9:4,
                10:5,
                11:9,
                12:3,
                13:0,
                14:1
            },
            tags:['yeezy','gray','Sneakers'],
            description: 'Designed by Kanye West'
        },{
            itemId: 'ADYB950W',
            department:'mens',
            brand:'Adidas',
            style:'Boots',
            name:'Yeezy Boost 950 White',
            images: ['img/yeezy-950-w.jpg','img2'],
            price: 700,
            prevOrders: 2,
            sizes: {
                6:0,
                7:7,
                8:2,
                9:0,
                10:5,
                11:9,
                12:0,
                13:0,
                14:0
            },
            tags:['yeezy','gray','boots'],
            description: 'Designed by Kanye West'
        },{
            itemId: 'NKSBMC',
            department:'mens',
            brand:'Nike',
            style:'Sneakers',
            name:'SB Dunk Money Cats',
            images: ['img/nike-sb-moneycats.jpg','img2'],
            price: 200,
            prevOrders: 2,
            sizes: {
                6:5,
                7:7,
                8:2,
                9:5,
                10:5,
                11:9,
                12:5,
                13:3,
                14:1
            },
            tags:['SB','dunks', 'highs'],
            description: 'Designed for the lucky.'
        },{
            itemId: 'NKSBCB',
            department:'mens',
            brand:'Nike',
            style:'Sneakers',
            name:'SB Dunk Cherry Blossoms',
            images: ['img/nike-sb-cherryblossoms.jpg','img2'],
            price: 200,
            prevOrders: 2,
            sizes: {
                6:5,
                7:7,
                8:2,
                9:5,
                10:5,
                11:9,
                12:5,
                13:3,
                14:1
            },
            tags:['SB','dunks','highs'],
            description: 'Beautiful cherry blossoms are the inspiration for these dunk highs.'
        },{
            itemId: 'LVKWJG',
            department:'mens',
            brand:'Louis Vuitton',
            style:'Sneakers',
            name:'LV X Kanye West Jaspers Gray',
            images: ['img/lv-kanye-white.jpg','img2'],
            price: 2000,
            prevOrders: 15,
            sizes: {
                6:0,
                7:0,
                8:0,
                9:0,
                10:0,
                11:0,
                12:0,
                13:0,
                14:0
            },
            tags:['lv','Kanye','lows'],
            description: 'Designed by the Louis Vuitton Don himself.'
        },{
            itemId: 'ADSMW',
            department:'womens',
            brand:'Adidas',
            style:'Sneakers',
            name:'Originals Stan Smith',
            images: ['img/adidas-stan-w.jpg','img2'],
            price: 175,
            prevOrders: 15,
            sizes: {
                6:3,
                7:3,
                8:3,
                9:3,
                10:0,
                11:0,
                12:0,
                13:0,
                14:0
            },
            tags:['lv','Kanye','lows'],
            description: 'Designed by the Louis Vuitton Don himself.'
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


