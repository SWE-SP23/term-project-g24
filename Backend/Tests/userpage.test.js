const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../server'); // assuming the server has been exported as app
const User = require('../Models/UserModel');
const Book = require('../Models/bookModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Books API', function() {
  let token, user, book;

  before(async function() {
    // Create a test user and book for testing
    user = new User({
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password'
    });
    await user.save();

    book = new Book({
      title: 'Test Book',
      author: 'Test Author'
    });
    await book.save();

    // Generate a JWT token for the test user
    token = jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs', { expiresIn: "2h" });
  });

  after(async function() {
    // Remove the test user and book after the tests are done
    await User.deleteOne({ _id: user._id });
    await Book.deleteOne({ _id: book._id });
  });

  describe('GET /api/user/books', function() {
    it('should get all books in user.books', function(done) {
      user.books.push(book);
      user.save()
        .then(function() {
          chai.request(app)
            .get('/api/user/books')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('message', 'Books added to user');
              expect(res.body).to.have.property('books').to.be.an('array').that.has.lengthOf(1);
              expect(res.body.books[0]).to.have.property('title', book.title);
              expect(res.body.books[0]).to.have.property('author', book.author);
              done();
            });
        })
        .catch(done);
    });

    it('should return an error if user is not found', function(done) {
      chai.request(app)
        .get('/api/user/books')
        .set('Authorization', 'Bearer ' + jwt.sign({ email: 'nonexistent@example.com', fullName: 'Nonexistent User', _id: '1234567890' }, 'RESTFULAPIs', { expiresIn: "2h" }))
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'User with id 1234567890 not found');
          done();
        });
    });

    it('should return an error if token is invalid', function(done) {
      chai.request(app)
        .get('/api/user/books')
        .set('Authorization', 'Bearer invalidtoken')
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('POST /api/user/books', function() {
    it('should add a book to user.books', function(done) {
      chai.request(app)
        .post('/api/user/books')
        .set('Authorization', 'Bearer ' + token)
        .send({ bookId: book._id })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Book added to user');
          done();
        });
    });

    it('should not add a book that is already in user.books', function(done) {
      user.books.push(book);
      user.save()
        .then(function() {
          chai.request(app)
            .post('/api/user/books')
            .set('Authorization', 'Bearer ' + token)
            .send({ bookId: book._id })
            .end(function(err, res) {
              expect(res).to.have.status(400);
              expect(res.body).to.have.property('message', 'Book already added to user');
              done();
            });
        })
        .catch(done);
    });

    it('should return an error if user is not found', function(done) {
      chai.request(app)
        .post('/api/user/books')
        .set('Authorization', 'Bearer ' + jwt.sign({ email: 'nonexistent@example.com', fullName: 'Nonexistent User', _id: '1234567890' }, 'RESTFULAPIs', { expiresIn: "2h" }))
        .send({ bookId: book._id })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'User with id 1234567890 not found');
          done();
        });
    });

    it('should return an error if book is not found', function(done) {
      chai.request(app)
        .post('/api/user/books')
        .set('Authorization', 'Bearer ' + token)
        .send({ bookId: 'nonexistentid' })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'Book not found');
          done();
        });
    });

    it('should return an error if token is invalid', function(done) {
      chai.request(app)
        .post('/api/user/books')
        .set('Authorization', 'Bearer invalidtoken')
        .send({ bookId: book._id })
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('DELETE /api/user/books', function() {
    it('should remove a book from user.books', function(done) {
      user.books.push(book);
      user.save()
        .then(function() {
          chai.request(app)
            .delete('/api/user/books')
            .set('Authorization', 'Bearer ' + token)
            .send({ bookId: book._id })
            .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('message', 'Book removed from user');
              done();
            });
        })
        .catch(done);
    });

    it('should not remove a book that is not in user.books', function(done) {
      chai.request(app)
        .delete('/api/user/books')
        .set('Authorization', 'Bearer ' + token)
        .send({ bookId: book._id })
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message', 'Book not found');
          done();
        });
    });

    it('should return an error if user is not found', function(done) {
      chai.request(app)
        .delete('/api/user/books')
        .set('Authorization', 'Bearer ' + jwt.sign({ email: 'nonexistent@example.com', fullName: 'Nonexistent User', _id: '1234567890' }, 'RESTFULAPIs', { expiresIn: "2h" }))
        .send({ bookId: book._id })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'User with id 1234567890 not found');
          done();
        });
    });

    it('should return an error if book is not found', function(done) {
      chai.request(app)
        .delete('/api/user/books')
        .set('Authorization', 'Bearer ' + token)
        .send({ bookId: 'nonexistentid' })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'Book not found');
          done();
        });
    });

    it('should return an error if token is invalid', function(done) {
      chai.request(app)
        .delete('/api/user/books')
        .set('Authorization', 'Bearer invalidtoken')
        .send({ bookId: book._id })
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});