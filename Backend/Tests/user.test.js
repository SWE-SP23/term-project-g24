const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../server'); // assuming the server has been exported as app
const User = require('../Models/UserModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication API', function() {
  let token, user;

  before(function(done) {
    // Create a test user for authentication
    user = new User({
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password'
    });
    user.save()
      .then(function() {
        // Generate a JWT token for the test user
        token = jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs', { expiresIn: "2h" });
        done();
      })
      .catch(done);
  });

  after(function(done) {
    // Remove the test user after the tests are done
    User.deleteOne({ _id: user._id })
      .then(function() {
        done();
      })
      .catch(done);
  });

  describe('POST /api/register', function() {
    it('should register a new user', function(done) {
      chai.request(app)
        .post('/api/register')
        .send({
          fullName: 'New User',
          email: 'newuser@example.com',
          password: 'password'
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });

  describe('POST /api/sign_in', function() {
    it('should authenticate a user with valid credentials', function(done) {
      chai.request(app)
        .post('/api/sign_in')
        .send({
          email: user.email,
          password: 'password'
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should not authenticate a user with invalid credentials', function(done) {
      chai.request(app)
        .post('/api/sign_in')
        .send({
          email: user.email,
          password: 'wrongpassword'
        })
        .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message', 'Authentication failed. Invalid user or password.');
          done();
        });
    });
  });

  describe('GET /api/profile', function() {
    it('should return the user profile if authenticated', function(done) {
      chai.request(app)
        .get('/api/profile')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('email', user.email);
          expect(res.body).to.have.property('fullName', user.fullName);
          expect(res.body).to.have.property('_id', String(user._id));
          done();
        });
    });

    it('should not return the user profile if not authenticated', function(done) {
      chai.request(app)
        .get('/api/profile')
        .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message', 'Unauthorized user!!');
          done();
        });
    });

    it('should not return the user profile with an invalid token', function(done) {
      chai.request(app)
        .get('/api/profile')
        .set('Authorization', 'Bearer invalidtoken')
        .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message', 'Invalid token');
          done();
        });
    });
  });
});