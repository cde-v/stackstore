var expect = require('chai').expect,
  request = require('supertest'),
  // app = require('../index.js'), how to require app

  app = require('../../../server/app'),
  Cart = require('mongoose').model('Cart'),
  Product = require('mongoose').model('Product'),
  agent = request.agent(app);
var promise = require('bluebird');

describe('Cart Routes:', function() {
  before(function(done) {
    Cart.remove({})
      .then(() => done());
  });

  afterEach(function(done) {
    Cart.remove({});
    Product.remove({});
    done();
  });

  describe('GET /cart', function() {
    it('responds with an array via JSON', function(done) {
      agent
        .get('/api/cart')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body).to.have.length(0);
        })
        .end(done);
    });

    it('returns a cart if there is one in the DB', function(done) {
      Cart.create({})
        .then(function() {
          agent
            .get('/api/cart')
            .expect(200)
            .expect(function(res) {
              expect(res.body).to.be.an.instanceOf(Array);
              expect(res.body).to.have.length(1);
            })
            .end(done);
        }).then(null, done);

    });
  });

  describe('GET /cart/:id', function() {
    var cart;

    before(function(done) {
      Cart.create({}).then(created => {
        cart = created;
        done();
      });
    });

    it('returns the selected cart based on the id', function(done) {
      agent
        .get('/api/cart/' + cart._id)
        .expect(function(res) {
          expect(res.body._id).to.equal(cart._id.toString());
        })
        .end(done);
    });

    it('returns a 500 if the ID does not exist', function(done) {
      agent
        .get('/api/cart/' + '12345')
        .expect(500)
        .end(done);
    });
  });

  

  xdescribe('POST /cart', function() {
    it('creates a new cart', function(done) {
      agent
        .post('/api/cart')
        .expect(function(res) {
          expect(res.body).to.not.equal('undefined');
        })
        .end(done);
    });

    it('saves the cart to the DB', function(done) {
      Cart.find({})
        .then(results => {
          expect(results).to.be.an.instanceOf(Array);
          expect(results.length).to.equal(3);
          done();
        });
    });
  });

  // xdescribe('POST /cart/:id/checkout', function() {});

  describe('PUT /cart/:id/:itemId', function() {
    var cart;
    var p1;

    before(function(done) {
      p1 = Product.create({
        itemId: "1",
        brand: "shoe",
        name: "shoes",
        price: 300,
        stock: 2,
        availability: true,
        sizes: [1, 2]
      });

      cart = Cart.create({});

      Promise.all([p1, cart]).then(results => {
        p1 = results[0];
        cart = results[1];
        done();
      });
    });

    it('adds an item to the cart', function(done) {
      agent
        .put('/api/cart/' + cart._id.toString() + '/' + p1._id.toString())
        .send({ quantity: 1 })
        .expect(function(res) {
          expect(res.body.items).to.have.length(1);
        })
        .end(done);
    });
  });

  describe('DELETE /cart/:id', function() {
    var p1 = Product.create({
      itemId: "1",
      brand: "shoe",
      name: "shoes",
      price: 300,
      stock: 2,
      availability: true,
      sizes: [1, 2]
    });

    var p2 = Product.create({
      itemId: "2",
      brand: "shoe",
      name: "shoes",
      price: 200,
      stock: 6,
      availability: true,
      sizes: [1, 2, 2, 2, 2, 2]
    });

    var p3 = Product.create({
      itemId: "3",
      brand: "shoe",
      name: "shoes",
      price: 100,
      stock: 5,
      availability: false,
      sizes: [1, 2, 2, 2, 2]
    });

    var cart = Cart.create({});

    before(function(done) {
      Promise.all([p1, p2, p3, cart]).then(results => {
        cart = results[3];
        cart.items = [
          { product: results[0]._id, quantity: 1 },
          { product: results[1]._id, quantity: 1 },
          { product: results[2]._id, quantity: 1 }
        ];
        done();
      });
    });

    it('clears all items from a cart', function(done) {
      agent
        .delete('/api/cart/' + cart._id)
        .expect(function(res) {
          Cart.find({_id:cart._id.toString()}).then(result => {
            expect(result.items.length).to.be(0);
            expect(result._id).to.equal(cart._id.toString());
          });
        })
        .end(done);
    });

  });

  describe('DELETE /cart/:id/:itemId', function() {
    var p1 = Product.create({
      itemId: "1",
      brand: "shoe",
      name: "shoes",
      price: 300,
      stock: 2,
      availability: true,
      sizes: [1, 2]
    });

    var p2 = Product.create({
      itemId: "2",
      brand: "shoe",
      name: "shoes",
      price: 200,
      stock: 6,
      availability: true,
      sizes: [1, 2, 2, 2, 2, 2]
    });

    var p3 = Product.create({
      itemId: "3",
      brand: "shoe",
      name: "shoes",
      price: 100,
      stock: 5,
      availability: false,
      sizes: [1, 2, 2, 2, 2]
    });

    var cart = Cart.create({});

    before(function(done) {
      Promise.all([p1, p2, p3, cart]).then(results => {
        p1 = results[0];
        cart = results[3];
        cart.items = [
          { product: results[0]._id, quantity: 1 },
          { product: results[1]._id, quantity: 1 },
          { product: results[2]._id, quantity: 1 }
        ];
        done();
      });
    });

    it('removes a specific item from the cart', function(done) {
      agent
        .delete('/api/cart/' + cart._id + "/" + p1._id)
        .expect(function(res) {
          Cart.find({_id:cart._id.toString()}).then(result => {
            expect(result.items.length).to.be(2);
            expect(result._id).to.equal(cart._id.toString());
          });
        }).end(done);
    });
  });

});
