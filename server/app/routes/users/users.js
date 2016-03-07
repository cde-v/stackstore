//using router instead of app

var router = require('express').Router();
var Cart = require('mongoose').model('Cart');
var Order = require('mongoose').model('Order');
var User = require('mongoose').model('User');

router.param('userId', routerParamUserId);
router.get('/', getAllUsers);
router.post('/signup', postNewUser);
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUserById);
router.get('/:userId/orders', getUserOrders);
router.get('/:userId/reviews', getUserReviews);
router.get('/:userId/cart', getUserCart);
router.put('/toggleAdmin/:userId', putToggleAdminUser);
router.put('/toggleNeedsPasswordReset/:userId', putToggleNeedsPasswordReset);
router.put('/updatePW/:userId', putUpdatePW);

function routerParamUserId(req, res, next, userId) {
  User.findById(userId).exec()
    .then(function(user) {
      if(!user) res.sendStatus(404);
      else req.requestedUser = user;
      next();
    })
    .then(null, next);
}

function getAllUsers(req, res, next) {
  User.find({}).exec()
    .then(function(users) {
      res.json(users);
    })
    .then(null, next);
}

function postNewUser(req, res, next) {
  User.create(req.body)
    .then(function(user) {
      res.status(201).json(user);
    })
    .then(null, next);
}

function getUserById(req, res, next) {
  res.json(req.requestedUser);
}

function deleteUserById(req, res, next) {
  req.requestedUser.remove()
    .then(function() {
      res.status(204).end();
    })
    .then(null, next);
}

function getUserOrders(req, res, next) {
  req.requestedUser.getUserOrders()
    .then(function(orders) {
      res.json(orders);
    })
    .then(null, next);
}

function getUserReviews(req, res, next) {
  req.requestedUser.getUserReviews()
    .then(function(reviews) {
      res.json(reviews);
    })
    .then(null, next);
}

function getUserCart(req, res, next) {
  res.json(req.requestedUser.currentCart);
}

function putToggleAdminUser(req, res, next) {
  req.requestedUser.toggleAdmin()
    .then(function(user) {
      res.json(user);
    })
    .then(null, next);
}

function putToggleNeedsPasswordReset(req, res, next) {
  req.requestedUser.toggleNeedsPasswordReset()
    .then(function(user) {
      res.json(user);
    })
    .then(null, next);
}

function putUpdatePW(req, res, next) {
  // console.log("req.body in routes", req.body);
  req.requestedUser.updatePW(req.body)
    .then(function(user) {
      res.json(user);
    })
    .then(null, next);
}

module.exports = router;
