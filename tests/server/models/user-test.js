var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var User = mongoose.model('User');

describe('User model', function() {

  beforeEach('Establish DB connection', function(done) {
    if(mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function(done) {
    clearDB(done);
  });

  it('should exist', function() {
    expect(User).to.be.a('function');
  });

  describe('password encryption', function() {

    describe('generateSalt method', function() {

      it('should exist', function() {
        expect(User.generateSalt).to.be.a('function');
      });

      it('should return a random string basically', function() {
        expect(User.generateSalt()).to.be.a('string');
      });

    });

    describe('encryptPassword', function() {

      var cryptoStub;
      var hashUpdateSpy;
      var hashDigestStub;
      beforeEach(function() {

        cryptoStub = sinon.stub(require('crypto'), 'createHash');

        hashUpdateSpy = sinon.spy();
        hashDigestStub = sinon.stub();

        cryptoStub.returns({
          update: hashUpdateSpy,
          digest: hashDigestStub
        });

      });

      afterEach(function() {
        cryptoStub.restore();
      });

      it('should exist', function() {
        expect(User.encryptPassword).to.be.a('function');
      });

      it('should call crypto.createHash with "sha1"', function() {
        User.encryptPassword('asldkjf', 'asd08uf2j');
        expect(cryptoStub.calledWith('sha1')).to.be.ok;
      });

      it('should call hash.update with the first and second argument', function() {

        var pass = 'testing';
        var salt = '1093jf10j23ej===12j';

        User.encryptPassword(pass, salt);

        expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
        expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);

      });

      it('should call hash.digest with hex and return the result', function() {

        var x = {};
        hashDigestStub.returns(x);

        var e = User.encryptPassword('sdlkfj', 'asldkjflksf');

        expect(hashDigestStub.calledWith('hex')).to.be.ok;
        expect(e).to.be.equal(x);

      });

    });

    describe('on creation', function() {

      var encryptSpy;
      var saltSpy;

      var createUser = function() {
        return User.create({ email: 'obama@gmail.com', password: 'potus' });
      };

      beforeEach(function() {
        encryptSpy = sinon.spy(User, 'encryptPassword');
        saltSpy = sinon.spy(User, 'generateSalt');
      });

      afterEach(function() {
        encryptSpy.restore();
        saltSpy.restore();
      });

      it('should call User.encryptPassword with the given password and generated salt', function(done) {
        createUser().then(function() {
          var generatedSalt = saltSpy.getCall(0).returnValue;
          expect(encryptSpy.calledWith('potus', generatedSalt)).to.be.ok;
          done();
        });
      });

      it('should set user.salt to the generated salt', function(done) {
        createUser().then(function(user) {
          var generatedSalt = saltSpy.getCall(0).returnValue;
          expect(user.salt).to.be.equal(generatedSalt);
          done();
        });
      });

      it('should set user.password to the encrypted password', function(done) {
        createUser().then(function(user) {
          var createdPassword = encryptSpy.getCall(0).returnValue;
          expect(user.password).to.be.equal(createdPassword);
          done();
        });
      });

    });

    describe('sanitize method', function() {

      var createUser = function() {
        return User.create({ email: 'obama@gmail.com', password: 'potus' });
      };

      it('should remove sensitive information from a user object', function() {
        createUser().then(function(user) {
          var sanitizedUser = user.sanitize();
          expect(user.password).to.be.ok;
          expect(user.salt).to.be.ok;
          expect(sanitizedUser.password).to.be.undefined;
          expect(sanitizedUser.salt).to.be.undefined;
        });
      });
    });

  });

});




// var chai = require('chai');
// chai.should();
// var expect = chai.expect;
// var chaiThings = require('chai-things');
// chai.use(chaiThings);
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised)
// var models = require('../models');
// var Page = models.Page;

// describe('Page model', function() {

//     afterEach(function (done) {
//       Page.remove({}).then(function () {
//           done();
//       }, done);
//     });

//     describe('Validations', function() {

//       var page;
//       beforeEach(function () {
//           page = new Page();
//       });

//       it('errors without title', function (done) {
//         page.validate(function (err) {
//           err.errors.title.should.be.an('object')
//           done();
//         });
//       });

//       it('errors without content', function (done) {
//         page.validate(function (err) {
//           expect(err.errors.content).to.be.an('object');
//           done();
//         });
//       });

//     });

//     describe('Statics', function() {

//         beforeEach('Create a page and save it', function () {
//           var page1; 

//           return Page.create({
//               title: 'Javascript',
//               content: 'Is real cool',
//               tags: ['javascript']
//           })
//           .then(function(page){
//               page1 = page;
//           })
//         });

//         describe('findByTag', function() {
//           it('gets pages with the search tag', function () {
//              return Page.findByTag('javascript').should.eventually.have.length(1)
//                    // Page.findByTag('javascript')
//                    // .then(function (pages) {
//                    //      expect(pages.length).to.be.equal(1);
//                    //      done();
//                    //  }).then(null, done);
//           });


//           it('does not get pages without the search tag', function () {
//             return Page.findByTag('meerrrrrrr').should.eventually.have.length(0)


//                 // Page.findByTag('falafel').then(function (pages) {
//                 //     expect(pages.length).to.be.equal(0);
//                 //     done();
//                 // }).then(null, done);
//           });
//         });
//     });

//     describe('Methods', function() {

//         var cohortPage;
//         beforeEach(function () {
//             return Page.create([
//                 {
//                     title: '1511',
//                     content: 'Awesome 36 people',
//                     tags: ['fullstack','javascript']
//                 },
//                 {
//                     title: 'Nugget',
//                     content: 'Joe\'s mom\'s dog',
//                     tags: ['joe', 'dogs']
//                 },
//                 {
//                     title: 'Nimit Maru',
//                     content: 'Javascript wizard',
//                     tags: ['fullstack', 'nimit']
//                 }
//             ]).then(function (pages) {
//                 cohortPage = pages[0];
//             });

//         });

//         describe('findSimilar', function() {
//             it('never gets itself', function () {
//                 return cohortPage.findSimilar().should.eventually.contain.an.item.with.property('title', 'Nimit Maru');
            
//                 //    cohortPage.findSimilar().then(function (otherPages) {
//                 //     otherPages.should.not.contain.an.item.with.property('title', 'Nimit Maru');
//                 //     done();
//                 // }).then(null, done);
//             });
//             it('gets other pages with any common tags', function (done) {
//                 cohortPage.findSimilar().then(function (otherPages) {
//                     otherPages.should.contain.an.item.with.property('title', 'Nimit Maru');
//                     done();
//                 }).then(null, done);
//             });
//             it('does not get other pages without any common tags', function (done) {
//                 cohortPage.findSimilar().then(function (otherPages) {
//                     otherPages.should.not.contain.an.item.with.property('title', 'Nugget');
//                     done();
//                 }).then(null, done);
//             });
//         });
//     });


//     describe('Virtuals', function() {

//         var fullstackPage;
//         beforeEach(function (done) {
//             Page.create({
//                 title: 'Fullstack Academy',
//                 content: 'A bootcamp for Javascript'
//             }).then(function (createdPage) {
//                 fullstackPage = createdPage;
//                 done();
//             }, done);
//         });

//         describe('route', function() {
//             it('returns the url_name prepended by "/wiki/"', function () {
//                 expect(fullstackPage.route).to.be.equal('/wiki/Fullstack_Academy');
//             });
//         });
//     });

//     describe('Hooks', function() {

//         var fullStackPage;
//         beforeEach(function () {
//             fullStackPage = new Page({
//                 title: 'Fullstack Academy',
//                 content: 'A bootcamp'
//             });
//         });

//         it('sets urlTitle based on title before validating', function (done) {
//             fullStackPage.validate().then(function () {
//                 expect(fullStackPage.urlTitle).to.be.equal('Fullstack_Academy');
//                 done();
//             }).then(null, done);

//         });


//     });

// });

// var supertest = require('supertest');
// var app = require('../app');
// var agent = supertest.agent(app)
// var Page = require('../models').Page;
// var chai = require('chai');
// var expect = chai.expect;
// var User = require('../models').User;
// var Bluebird = require('bluebird');


// describe('http requests', function() {

//     afterEach(function (done) {
//       Bluebird.all([
//         Page.remove({}), 
//         User.remove({})
//       ])
//       .then(function(){
//         done()
//       })
//       .then(null, function(err){
//         done(err)
//       })
//     });

//     beforeEach(function (done) {
//       Page.create({
//           title: 'Nimit Maru',
//           content: '1601 is the best',
//           tags: ['fullstack']
//       }).then(function () {
//           done();
//       }, done);
//     });

//     describe('GET /', function() {
//       it('gets 200', function (done) {
//         agent
//         .get('/')
//         .expect(200, done);
//       });
//     });

//     describe('GET /wiki/add', function() {
//       it('gets 200', function (done) {
//         agent
//           .get('/wiki/add')
//           .expect(200, done);
//       });
//     });


//     describe('GET /wiki/:urlTitle', function() {
//       it('gets 404 on page that doesnt exist', function (done) {
//         agent
//         .get('/wiki/This_Doesnt_Exist')
//         .expect(404, done);
//       });
//       it('gets 200 on page that does exist', function (done) {
//         agent
//         .get('/wiki/Nimit_Maru')
//         .expect(200, done);
//       });
//     });

//     describe('GET /wiki/search', function() {
//       it('gets 200', function (done) {
//         agent
//         .get('/wiki/search?search=javascript')
//         .expect(200, done);
//       });
//     });

//     describe('GET /wiki/:urlTitle/similar', function() {
//       it('gets 404 for page that doesn\'t exist', function (done) {
//         agent
//         .get('/wiki/Doesnt_Exist/similar')
//         .expect(404, done);
//       });

//       it('gets 200 for similar page', function (done) {
//         agent
//           .get('/wiki/Nimit_Maru/similar')
//           .expect(200, done);
//       });
//     });


//     describe('POST /wiki', function() {
//       it('creates a page in db', function (done) {
//         agent
//         .post('/wiki')
//         .send({
//             title: '1601', 
//             content: '1601', 
//             name: '1601', 
//             email: '1601@1601.1601', 
//             tags: '1601'
//         })
//         .end(function (err, response) {
//             if (err) return done(err);
//             // MUST ACCESS REPONSE IN END VIA BODY PROPERTY
//             expect(response.body.title).to.equal('1601')
//             done()
//         });

//       });
//     });
// });