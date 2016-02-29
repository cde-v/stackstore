//using router instead of app
//creating req.params for userid

var app = require('express');
var Cart = require('mongoose').model('Cart');
var Order = require('mongoose').model('Order'); //how to get mongoose models?

app.get('/:id', function(req, res, next) {
  Cart.findOne({ _id: req.params.id })
    .then(result => {
      result.total = result.getTotal();
      res.json(result);
    })
    .catch(res.send); //different error function
});

//flesh out checkout function
app.post('/:id/checkout', function(req, res, next) {
  Order.create({}).then(result => res.json(result));
});

app.put('/:id/quantity', function(req, res, next) {
  // use a bodyparsing middleware
  Cart.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(result => res.json(result))
    .catch(res.send); //different error function
});

app.delete('/:id', function(req, res, next) {
  Cart.findOne({ _id: req.params.id })
    .then(result => {
      result.items = [];
      result.save();
      res.json(result);
    }).catch(res.send); //improve error handling
});

app.delete('/:id/:itemId', function(req, res, next) {
  Cart.findOne({ _id: req.params.id })
    .then(result => res.json(result.removeItem(req.params.itemId)))
    .catch(res.send); //different error function
});
