const expect = require('chai').expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const registerController = require('../Controllers/UserController').register;

describe('Auth Controller', function() {
  describe('register', function() {
    it('should create a new user and return a JWT token', function(done) {
      const req = {
        body: {
          fullName: 'Test User',
          email: 'test@example.com',
          password: 'password'
        }
      };
      const res = {
        header: sinon.spy(),
        json: sinon.spy(),
        status: sinon.spy()
      };
      sinon.stub(User.prototype, 'save').resolves({ _id: 'someuserid', fullName: 'Test User', email: 'test@example.com' });
      const hashStub = sinon.stub(bcrypt, 'hashSync').returns('hashedpassword');
      const signStub = sinon.stub(jwt, 'sign').returns('sometoken');
      registerController(req, res)
        .then(function() {
          expect(res.header.calledWith('Authorization', 'Bearer sometoken')).to.be.true;
          expect(res.json.calledWith({ message: 'User registered successfully' })).to.be.true;
          expect(res.status.calledWith(200)).to.be.true;
          expect(hashStub.calledWith('password', 10)).to.be.true;
          expect(signStub.calledWith({ email: 'test@example.com', fullName: 'Test User', _id: 'someuserid' }, 'RESTFULAPIs', { expiresIn: "2h" })).to.be.true;
          User.prototype.save.restore();
          bcrypt.hashSync.restore();
          jwt.sign.restore();
          done();
        })
        .catch(done);
    });

    it('should return a 400 error if there is an error saving the user', function(done) {
      const req = {
        body: {
          fullName: 'Test User',
          email: 'test@example.com',
          password: 'password'
        }
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy()
      };
      sinon.stub(User.prototype, 'save').rejects('Save error');
      registerController(req, res)
        .then(function() {
          expect(res.status.calledWith(400)).to.be.true;
          expect(res.send.calledWith({ message: 'Save error' })).to.be.true;
          User.prototype.save.restore();
          done();
        })
        .catch(done);
    });
  });
});








// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const jwt = require('jsonwebtoken');
// const app = require('../server'); // assuming the server has been exported as app
// const User = require('../Models/UserModel');

// chai.use(chaiHttp);
// const expect = chai.expect;

// describe('Authentication API', function() {
//   let token, user;

//   before(async function() {
//     // Create a test user for authentication
//     user = new User({
//       fullName: 'Test User',
//       email: 'test@example.com',
//       password: 'password'
//     });
//     await user.save();
//     // Generate a JWT token for the test user
//     token = jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs', { expiresIn: "2h" });
//   });

//   after(async function() {
//     // Remove the test user after the tests are done
//     await User.deleteOne({ _id: user._id });
//   });

//   describe('POST /auth/register', function() {
//     it('should register a new user', async function() {
//       const res = await chai.request(app)
//         .post('/auth/register')
//         .send({
//           fullName: 'New User',
//           email: 'newuser@example.com',
//           password: 'password'
//         });
//       expect(res).to.have.status(200);
//       expect(res.body).to.have.property('token');
//     });
//   });


//   describe('POST /auth/sign_in', function() {
//     it('should authenticate a user with valid credentials', function(done) {
//       chai.request(app)
//         .post('/api/sign_in')
//         .send({
//           email: user.email,
//           password: 'password'
//         })
//         .end(function(err, res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('token');
//           done();
//         });
//     });

//     it('should not authenticate a user with invalid credentials', function(done) {
//       chai.request(app)
//         .post('/auth/sign_in')
//         .send({
//           email: user.email,
//           password: 'wrongpassword'
//         })
//         .end(function(err, res) {
//           expect(res).to.have.status(401);
//           expect(res.body).to.have.property('message', 'Authentication failed. Invalid user or password.');
//           done();
//         });
//     });
//   });

//   // describe('GET /api/profile', function() {
//   //   it('should return the user profile if authenticated', function(done) {
//   //     chai.request(app)
//   //       .get('/api/profile')
//   //       .set('Authorization', 'Bearer ' + token)
//   //       .end(function(err, res) {
//   //         expect(res).to.have.status(200);
//   //         expect(res.body).to.have.property('email', user.email);
//   //         expect(res.body).to.have.property('fullName', user.fullName);
//   //         expect(res.body).to.have.property('_id', String(user._id));
//   //         done();
//   //       });
//   //   });

//   //   it('should not return the user profile if not authenticated', function(done) {
//   //     chai.request(app)
//   //       .get('/api/profile')
//   //       .end(function(err, res) {
//   //         expect(res).to.have.status(401);
//   //         expect(res.body).to.have.property('message', 'Unauthorized user!!');
//   //         done();
//   //       });
//   //   });

//   //   it('should not return the user profile with an invalid token', function(done) {
//   //     chai.request(app)
//   //       .get('/api/profile')
//   //       .set('Authorization', 'Bearer invalidtoken')
//   //       .end(function(err, res) {
//   //         expect(res).to.have.status(401);
//   //         expect(res.body).to.have.property('message', 'Invalid token');
//   //         done();
//   //       });
//   //   });
//   // });
// });