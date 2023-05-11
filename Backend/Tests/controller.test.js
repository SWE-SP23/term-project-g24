const mongoose = require('mongoose');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const User = require('../Models/UserModel'),
  Book = require('../Models/bookModel'),
  Author = require('../Models/authorModel');
const { get_author, add_comment, get_book, get_author_books, search_by_parameter } = require('../Controllers/DisplayController');
const jwt = require('jsonwebtoken');

describe('Controller functions', () => {
  // Define test data
  const author = {
    _id:'6457976cfc13ae55546010cc',
    name: 'hayam',
    bio: 'winner award writer',
    icon: 'http://dummyimage.com/112x100.png/dddddd/000000',
    books: null

  };
  const book = {
    name: "book1",
    brief: "a book about mystery",
    cover: "http://dummyimage.com/204x100.png/cc0000/ffffff",
    category: "mystery",
    author_id: "6457976cfc13ae55546010ca",
    reviews: [
      {
        "64514b9fd8da0cc49ab4c2e6": "good"
      }
    ]
  };
  const token = jwt.sign({ _id: 'userId123', fullName: 'John Doe' }, 'RESTFULAPIs');

  // Test case 1: get_author with valid ID
  it('get_author should return the author if the ID is valid', async () => {
    // Mock the request and response objects
    const req = { body: { _id: '6457976cfc13ae55546010cc' } };
    const res = { json: sinon.spy() };

    // Mock the Author.findOne method to return a sample author
    const findOneStub = sinon.stub(Author, 'findOne').resolves(author);

    // Call the function and assert that the author is returned
    await get_author(req, res);
    expect(findOneStub.calledOnceWith({body:{ _id: '6457976cfc13ae55546010cc' }})).to.be.true;
    expect(res.json.calledOnceWith(author)).to.be.true;

    // Restore the stubbed method
    findOneStub.restore();
  });

  // // Test case 2: get_author with invalid ID
  // it('get_author should return 400 if the ID is invalid', async () => {
  //   // Mock the request and response objects
  //   const req = { body: { _id: '6457976cfc13ae55546010cc' } };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.spy(),
  //   };

  //   // Call the function and assert that a 400 status code is returned
  //   await get_author(req, res);
  //   expect(res.status.calledOnceWith(400)).to.be.true;
  //   expect(res.json.calledOnceWith({ message: 'Invalid author ID' })).to.be.true;
  // });

  // // Test case 3: add_comment with valid data
  // it('add_comment should add a comment to the book and return the comment', async () => {
  //   // Mock the request and response objects
  //   const req = { body: { _id: '645799fe34238dd728b3b2f4', body: 'A comment' }, headers: { authorization: token } };
  //   const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

  //   // Mock the Book.findById method to return a sample book
  //   const findByIdStub = sinon.stub(Book, 'findById').resolves(book);

  //   // Call the function and assert that the comment is added and returned
  //   await add_comment(req, res);
  //   expect(findByIdStub.calledOnceWith({ _id: '645799fe34238dd728b3b2f4' })).to.be.true;
  //   expect(res.status.calledOnceWith(200)).to.be.true;
  //   expect(res.json.calledOnceWith(sinon.match({ user: 'userId123', body: 'A comment' }))).to.be.true;

  //   // Restore the stubbed method
  //   findByIdStub.restore();
  // },5000);

  // // Test case 4: add_comment with invalid book ID
  // it('add_comment should return 400 if the book ID is invalid', async () => {
  //   // Mock the request and response objects
  //   const req = { body: { _id: 'invalidID', body: 'A comment' }, headers: { authorization: token } };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.spy(),
  //   };

  //   // Call the function and assert that a 400 status code is returned
  //   await add_comment(req, res);
  //   expect(res.status.calledOnceWith(400)).to.be.true;
  //   expect(res.json.calledOnceWith({ message: 'Invalid book ID' })).to.be.true;
  // });

  // // Test case 5: get_book with valid ID
  // it('get_book should return the book and author data if the ID is valid', async () => {
  //   // Mock the request and response objects
  //   const req = { body: { _id: 'validID' } };
  //   const res = { json: sinon.spy() };

  //   // Mock the Book.aggregate method to return a sample result
  //   const aggregateStub = sinon.stub(Book, 'aggregate').resolves([{ _id: 'validID', author_data: [author] }]);

  //   // Call the function and assert that the book and author data are returned
  //   await get_book(req, res);
  //   expect(aggregateStub.calledOnceWith([
  //     { $match: { _id: sinon.match.instanceOf(mongoose.Types.ObjectId).and(sinon.match.has('toString', 'validID')) } },
  //     {
  //       $lookup: {
  //         from: 'authors',
  //         localField: 'author_id',
  //         foreignField: '_id',
  //         as: 'author_data'
  //       }
  //     }
  //   ])).to.be.true;
  //   expect(res.json.calledOnceWith([{ _id: 'validID', author_data: [author] }])).to.be.true;

  //   // Restore the stubbed method
  //   aggregateStub.restore();
  // });

  // // Test case 6: get_author_books with valid data
  // it('get_author_books should return the books with the given IDs', async () => {
  //   // Mock the request and response objects
  //   const req = { body: { author_id: 'authorId123', author_books: ['bookId1', 'bookId2'] } };
  //   const res = { json: sinon.spy() };

  //   // Mock the Book.aggregate method to return a sample result
  //   const aggregateStub = sinon.stub(Book, 'aggregate').resolves([{ _id: 'bookId1' }, { _id: 'bookId2' }]);

  //   // Call the function and assert that the books are returned
  //   await get_author_books(req, res);
  //   expect(aggregateStub.calledOnceWith([
  //     { $match: { _id: { $in: ['bookId1', 'bookId2'].map(id => new mongoose.Types.ObjectId(id)) } } }
  //   ])).to.be.true;
  //   expect(res.json.calledOnceWith([{ _id: 'bookId1' }, { _id: 'bookId2' }])).to.be.true;

  //   // Restore the stubbed method
  //   aggregateStub.restore();
  // });

  // // Test case 7: search_by_parameter with name and category
  // it('search_by_parameter should return books with the given name and category', async () => {
  //   // Mock the request and response objects
  //   const req = { body: { name: 'book', category: 'Fiction' } };
  //   const res = { json: sinon.spy() };

  //   // Mock the Book.find method to return a sample result
  //   const findStub = sinon.stub(Book, 'find').resolves([{ name: 'A book', category: 'Fiction' }]);

  //   // Call the function and assert that the books are returned
  //   await search_by_parameter(req, res);
  //   expect(findStub.calledOnceWith({ name: { $regex: 'book', $options: 'i' }, category: 'Fiction' })).to.be.true;
  //   expect(res.json.calledOnceWith([{ name: 'A book', category: 'Fiction' }])).to.be.true;

  //   // Restore the stubbed method
  //   findStub.restore();
  // });

  // // Test case 8: search_by_parameter with author name and category
  // it('search_by_parameter should return books by the author with the given name and category', async () => {
  //   // Mock the request and response objects
  //   const req = { body: { author_name: 'John Doe', category: 'Fiction' } };
  //   const res = { json: sinon.spy() };

  //   // Mock the Author.aggregate method to return a sample result
  //   const aggregateStub = sinon.stub(Author, 'aggregate').resolves([{ name: 'John Doe', author_books: [{ category: 'Fiction' }] }]);

  //   // Call the function and assert that the books are returned
  //   await search_by_parameter(req, res);
  //   expect(aggregateStub.calledOnceWith([
  //     { $match: { name: 'John Doe' } },
  //     {
  //       $lookup: {
  //         from: 'books',
  //         localField: '_id',
  //         foreignField: 'author_id',
  //         as: 'author_books'
  //       }
  //     }, {
  //       $project: {
  //         _id: 0,
  //         name: 1,
  //         bio: 1,
  //         icon: 1,
  //         author_books: {
  //           $filter: {
  //             input: '$author_books',
  //             as: 'item',
  //             cond: {
  //               $or: [
  //                 { $eq: ['$$item.category', 'Fiction'] }
  //               ]
  //             }
  //           }
  //         }
  //       }
  //     }
  //   ])).to.be.true;
  //   expect(res.json.calledOnceWith([{ name: 'John Doe', author_books: [{ category: 'Fiction' }] }])).to.be.true;

  //   // Restore the stubbed method
  //   aggregateStub.restore();
  // });
});