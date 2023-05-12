const mongoose = require('mongoose');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const User = require('../Models/UserModel');
const Book = require('../Models/bookModel');
const Author = require('../Models/authorModel');
const { get_author, add_comment, get_book, get_author_books, search_by_parameter } = require('../Controllers/DisplayController');
const jwt = require('jsonwebtoken');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

describe('Controller functions', () => {
  // Define test data
  const authorData = {
     _id: new mongoose.Types.ObjectId("6457976cfc13ae55546010ca"),
    name: 'hayam',
    bio: 'winner award writer',
    icon: 'http://dummyimage.com/112x100.png/dddddd/000000',
    books: null,
    __v: 0
  };
  const bookData = {
    _id: new mongoose.Types.ObjectId('645799fe34238dd728b3b2f4'),
    name: "book1",
    brief: "a book about mystery",
    cover: "http://dummyimage.com/204x100.png/cc0000/ffffff",
    category: "mystery",
    author_id: "6457976cfc13ae55546010ca",
    reviews: [
      {
        user: "64514b9fd8da0cc49ab4c2e6",
        body: "good"
      }
    ]
  };
  const token = jwt.sign({ _id: '645799fe34238dd728b3b2f4', fullName: 'John Doe' }, 'RESTFULAPIs');
  
  // Connect to the Mockgoose instance
  before(async () => {
    await mockgoose.prepareStorage();
    await mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
    // Create a new author object and save it to the database
    const author = new Author(authorData);
    await author.save();

    // Create a new book object and save it to the database
    const book = new Book(bookData);
    await book.save();
  });

 // Disconnect from the Mockgoose instance
  after(async () => {
    await mongoose.connection.close();
  });

  //Test case 1: get_author with valid ID
  it('get_author should return the author if the ID is valid', async() => {
  // Mock the request and response objects
  const req = { body: { _id: authorData._id } };
  const res = { status: sinon.stub().returns({ json: sinon.spy() })};
  
  sinon.stub(Author, "findById").returns(authorData);

    await get_author(req, res);

    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.status().json.calledOnceWith(authorData)).to.be.true;

    Author.findById.restore();

});


  // Test case 2: get_author with non existent ID
  it('get_author should return error message if the ID non existent', async () => {
    // Mock the request and response objects
    const req = { body: { _id: new mongoose.Types.ObjectId('64a7976cfc13ae55546010c5') } };
    const res = { status: sinon.stub().returns({ json: sinon.spy() }) };

    const result = await get_author(req, res);

    expect(res.status.calledOnceWith(404)).to.be.true;
    expect(
      res.status().json.calledOnceWith({ message: "Author not found" })
    ).to.be.true;
  });

  // Test case 3: add_comment with valid data
  it('add_comment should add a comment to the book and return the comment', async () => {
    // Mock the request and response objects
    const req = { body: { _id: '645799fe34238dd728b3b2f4', body: 'A comment' }, headers: { authorization: token } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    // Mock the Book.findById method to return a sample book
    const findByIdStub = sinon.stub(Book, 'findById').resolves(bookData);

    // Call the function and assert that the comment is added and returned
    await add_comment(req, res);
    expect(res.status.calledOnceWith(200)).to.be.true;

    // Restore the stubbed method
    findByIdStub.restore();
  },5000);

  // Test case 4: add_comment with invalid book ID
  it('add_comment should return 400 if the book ID is invalid', async () => {
    // Mock the request and response objects
    const req = { body: { _id: 'invalidID', body: 'A comment' }, headers: { authorization: token } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the function and assert that a 400 status code is returned
    await add_comment(req, res);
    expect(res.status.calledOnceWith(400)).to.be.true;
    expect(res.json.calledOnceWith({ message: 'Invalid book ID' })).to.be.true;
  });

  

  // Test case 7: search_by_parameter with name and category
  it('search_by_parameter should return books with the given name and category', async () => {
    // Mock the request and response objects
    const req = { body: { name: 'book1', category: 'mystery' } };
    const res = { status: sinon.stub().returns({ json: sinon.spy() })};
  
    // Mock the Book.find method to return a sample result
    const findStub = sinon.stub(Book, 'find').resolves(bookData);

    // Call the function and assert that the books are returned
    await search_by_parameter(req, res);
    expect(res.status.calledOnceWith(200)).to.be.true;

    // Restore the stubbed method
    findStub.restore();
  });

});

