const mongoose = require('mongoose');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const User = require('../Models/UserModel');
const Book = require('../Models/bookModel');
const { get_all_books} = require('../Controllers/UserController');
const jwt = require('jsonwebtoken');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

describe('Controller functions', () => {
  // Define test data
  const user = {
     _id: new mongoose.Types.ObjectId("645ad063b06625ff67507a48"),
    fullName: 'tester',
    email:'test@mail.com',
    password:"1234",
    books: null,
    __v: 0
  };
  const bookData = {
    _id: new mongoose.Types.ObjectId(),
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
  const token = jwt.sign({ _id: 'userId123', fullName: 'John Doe' }, 'RESTFULAPIs');
  
  // Connect to the Mockgoose instance
  before(async () => {
    await mockgoose.prepareStorage();
    await mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
    // Create a new author object and save it to the database
    const us = new User(user);
    await us.save();

    // Create a new book object and save it to the database
    const book = new Book(bookData);
    await book.save();
  });

 // Disconnect from the Mockgoose instance
  after(async () => {
    await mongoose.connection.close();
  });

  //Test case 1: get_author with valid ID
  it('get_all_books should return the author if the ID is valid', async() => {
  // Mock the request and response objects
  const req = { body: { _id: user._id } };
  const res = { status: sinon.stub().returns({ json: sinon.spy() })};
  
  sinon.stub(User, "findById").returns(user);

    await get_all_books(req, res);

    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.status().json.calledOnceWith(user)).to.be.true;

    User.findById.restore();

});


  // Test case 2: get_author with non existent ID
  it('get_all_books should return error message if the ID non existent', async () => {
    // Mock the request and response objects
    const req = { body: { _id: new mongoose.Types.ObjectId('64a7976cfc13ae55546010c5') } };
    const res = { status: sinon.stub().returns({ json: sinon.spy() }) };

    const result = await get_all_books(req, res);

console.log('debug 1');
    expect(res.status.calledOnceWith(404)).to.be.true;
    expect(
      res.status().json.calledOnceWith({ message: "user not found" })
    ).to.be.true;
    console.log('debug 2');
  });
});