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
var User = Promise.promisifyAll(mongoose.model('User'));

var seedUsers = function() {
  var users = [{
    email: 'testing@fsa.com',
    firstName: 'Tester',
    lastName: 'McTesterson',
    password: 'password',
    isAdmin: true
  }, {
    email: 'cpdevill@gmail.com',
    firstName: 'C',
    lastName: 'dV',
    password: 'password',
    isAdmin: true
  }, {
    email: 'obama@gmail.com',
    firstName: 'Barack',
    lastName: 'Obama',
    password: 'potus'
  },{
    email: 'kanye@west.com',
    firstName: 'Kanye',
    lastName: 'West',
    password: 'yeezus',
    isAdmin: true,
    photoUrl: 'img/kanye-west.jpg'
  }];

  for(var i = 0; i < 30; i++) {
    users.push({
      email: chance.email(),
      password: "password",
      firstName: "Joe/Jane",
      lastName: "Shoeshopper PhD, Esq, CPA"
    });
  }

  return User.createAsync(users);
};

connectToDb.then(function() {
  User.findAsync({}).then(function(users) {
    if(users.length === 0) {
      return seedUsers();
    } else {
      console.log(chalk.magenta('Seems to already be user data, exiting!'));
      process.kill(0);
    }
  }).then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  }).catch(function(err) {
    console.error(err);
    process.kill(1);
  });
});
