const mongoose = require('mongoose');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const User = require('../Models/UserModel');
const Book = require('../Models/bookModel');
const Author = require('../Models/authorModel');
const jwt = require('jsonwebtoken');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const { get_all_books } = require('../Controllers/UserpageController');
// 
describe('Controller functions', () => {
  
   // Define test data
      const userData = {
        _id: '645ad063b06625ff67507a48',
        fullName: 'tester',
        email: 'test@mail.com',
        password: '1234',
        books: [ '645799fe34238dd728b3b2f4' ],
      };
      const bookData = {
        _id: '645799fe34238dd728b3b2f4',
        name: 'book1',
        brief: 'a book about mystery',
        cover: 'http://dummyimage.com/204x100.png/cc0000/ffffff',
        category: 'mystery',
        author_id: '6457976cfc13ae55546010ca',
        reviews: [
          {
            user: '64514b9fd8da0cc49ab4c2e6',
            body: 'good',
          },
        ],
      };
      const token = jwt.sign({ email: userData.email, fullName: userData.fullName, _id: userData._id}, 'RESTFULAPIs');
      

  // Connect to the Mockgoose instance
  before(async () => {
    // this.timeout(5000);
    await mockgoose.prepareStorage();
    await  mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
    // Create a new author object and save it to the database
    const user = new User(userData);
    await user.save();

    // Create a new book object and save it to the database
    const book = new Book(bookData);
    await book.save();
  });

  // Disconnect from the Mockgoose instance
  after(async () => {
    await  mongoose.connection.close();
  });

  // Test case 1: get_all_books should return books added to the user
   it('should return the books added by the user', async () => {
     const req = {
        headers: {
          authorization: token,
        },
        params: {
          userId: userData._id,
        },
      };
      const res = {
        status: sinon.stub().returns({
          json: sinon.stub(),
        }),
      };
      // Define the expected result
      const expectedResult = {
        status: 200,
        data: {
          message: 'Books added to user',
          books: [ new mongoose.Types.ObjectId('645799fe34238dd728b3b2f4') ],
        },
      };
      // Mock the User and Book models to return the test data
      sinon.stub(User, 'findById').returns({
        populate: sinon.stub().returns(userData),
      });
      sinon.stub(Book, 'find').returns([ bookData ]);
      // Call the function with the test data
      await get_all_books(req, res);
      // Assert that the response matches the expected result
      expect(res.status.calledWith(expectedResult.status)).to.be.true;

      // Restore the stubbed methods
      User.findById.restore();
      Book.find.restore();
    });

//   // Test case 2: get_all_books should return User found message if user exists
  it('should return token invalid if token corrupted', async () => {
    const t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJmdWxsTmFtZSI6InRlc3RlciIsIl9pZCI6IjY0NWFkMDYzYjA2NjI1ZmY2NzUwN2E0OCIsImlhdCI6MTY4Mzg0NTgyNn0.Fr7MeHquWAT6Iyy2my1ITkei9aXXnwBcuOufYjyKwqp'
    const req = {
      headers: { authorization: t },
    };
   const res = { status: sinon.stub().returns({
          json: sinon.stub(),
        }),};
    
    sinon.stub(User, "findById").returns();

    await get_all_books(req, res);

    expect(res.status.calledWith(500)).to.be.true;
  });


});