const mongoose = require('mongoose');
const Author = mongoose.model('author');
const Book = mongoose.model('book');

exports.get_author = function(req, res) {
  const authorId = req.body._id;
  console.log(authorId);
  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: 'Invalid author ID' });
  }
  Author.findOne({_id:authorId})
    .then(function(author) {
      if (!author) {
        console.log(author);
        return res.status(401).json({ message: 'There seems to be a problem fetching data about author' });
      }
      return res.json(author);
    }).catch(function(err) {
      throw err;
    });
};

exports.get_book = function(req, res) {
  const bookId = req.body._id;
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }
  Book.findOne({_id:bookId})
    .then(function(book) {
      if (!book) {
        return res.status(401).json({ message: 'There seems to be a problem fetching data about book' });
      }
      return res.json(book);
    }).catch(function(err) {
      throw err;
    });
}; 