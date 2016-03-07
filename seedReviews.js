var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Reviews = Promise.promisifyAll(mongoose.model('Reviews'));
var seedReviews = function () {

    var reviews = [
        {
            product: "56dcc6215bccff838eb84db1",
            author:'56db79c7d3fcd004e0bad091',
            rating:5,
            body:'these are so dope'
         
        }
    ]
    return Reviews.createAsync(reviews);

};

connectToDb.then(function () {
    Reviews.findAsync({}).then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews();
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