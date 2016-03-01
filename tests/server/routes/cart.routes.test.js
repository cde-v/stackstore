var expect = require('chai').expect,
  request = require('supertest'),
  // app = require('../index.js'), how to require app

  app = require('../../../server/app'),
  Cart = require('mongoose').model('Cart'),
  Product = require('mongoose').model('Product'),
  agent = request.agent(app);

describe('Cart Routes:', function() {
  before(function(done){
    Cart.remove({})
        .then(() => done());
  });

  afterEach(function(done) {
    Cart.remove({})
      .then(() => done());
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
          if (typeof res.body === 'string') {
            res.body = JSON.parse(res.body);
          }
          expect(res._id).to.equal(cart._id);
        })
        .end(done);
    });

    // it('returns a 500 if the ID does not exist', function(done) {
    //   agent
    //     .get('/api/cart/' + '12345')
    //     .expect(500)
    //     .end(done);
    // });


  });

  describe('POST /cart', function() {
    it('creates a new cart', function(done) {
      agent
        .post('/cart')
        .expect(function(res) {
          expect(res.body._id).to.not.be('undefined');
        })
        .end(done);
    });

    it('saves the article to the DB', function(done) {
      Cart.find({})
        .then(results => {
          expect(results).to.be.an.instanceOf(Array);
          expect(results.length).to.be(1);
          done();
        });
    });
  });

  //describe('POST /cart/:id/checkout', function(){}) needs orders

  describe('PUT /cart/:id/:itemId', function() {
    var cart;

    before(function(done) {
      Cart.create({}).then(created => {
        cart = created;
        //put a product into cart
        done();
      });
    });

    // agent.put() need product to finish
  });

  describe('DELETE /cart/:id', function() {
    var cart;

    before(function(done) {
      Cart.create({}).then(created => {
        cart = created;
        //put a product into cart
        done();
      });
    });

    it('clears all items from a cart', function(done) {
      agent
        .delete('/api/cart/' + cart._id)
        .expect(function(res) {
          expect(res.items.length).to.be(0);
          expect(res._id).to.be(cart._id);
        })
        .end(done);
    });

  });

  describe('DELETE /cart/:id/:itemId', function() {
    var cart;
    var prod;

    before(function(done) {
      Cart.create({}).then(created => {
        cart = created;
        return Product.create({
          itemId:"123",
          brand:"shoe",
          name:"shoes",
          price:300,
          stock:5,
          availability:true
        });
      }).then(product => {
        prod = product;
        cart.items.push({product:product._id, quantity:1});
        cart.save();
        done();
      });
    });

    it('removes a specific item from the cart', function(done) {
      agent
        .delete('/api/cart/' + cart._id + "/" + prod._id)
        .expect(function(res){
          expect(res.items.length).to.be(0);
          done();
        });
    });
  });

});