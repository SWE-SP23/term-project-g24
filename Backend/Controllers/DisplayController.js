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
   Book.aggregate([
     { $match: { _id:  new mongoose.Types.ObjectId(bookId) } },
    {
      $lookup: {
        from: 'authors',
        localField: 'author_id',
        foreignField: '_id',
        as: 'author_data'
      }
    }
  ]).then(result => {
  console.log(result);
  return res.json(result);
}).catch(err => {
  console.error(err);
  throw err;
});
};

exports.get_author_books = function(req, res) {
  const authorId = req.body.author_id;
  const bookIds = req.body.author_books;
  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: 'Invalid author ID' });
  }
   Book.aggregate([
  { $match: { _id: { $in: bookIds.map(id => new mongoose.Types.ObjectId(id)) } } }
]).then(result => {
  console.log(result);
  return res.json(result);
}).catch(err => {
  console.error(err);
  throw err;
});
};

 //name category  author name
exports.search_by_parameter = async function (req,res) {
  const {name,category,author_name} = req.body;
  console.log(name);
  console.log(category);
  console.log(author_name);
  const query = {};
  if(req.body.name){
    query.name = { $regex: req.body.name, $options: 'i' };
  }

 if(req.body.category){
    query.category = req.body.category;
  }

  if(req.body.author_name && (req.body.category || req.body.name)){
    Author.aggregate([
  {$match: {name: req.body.author_name}},{
    $lookup: {
      from: 'books',
        localField: '_id',
        foreignField: 'author_id',
        as: 'author_books'
      
    }
  },{
    $project: {
      _id: 0,
      name: 1,
      bio:1,
      icon:1,
      author_books: {
      $filter: {
        input: '$author_books',
        as: 'item',
        cond: {
          $or:[
             {$eq: ['$$item.category', req.body.category]},
             {$eq: ['$$item.name', req.body.name]}
       ] }
      }
    }
    }
  }
]).then(result => {
  console.log(result);
  return res.json(result);
}).catch(err => {
  console.error(err);
  throw err;
});
  }
  else if(req.body.author_name) {
    Author.aggregate([
      {$match: {name: req.body.author_name}},{
        $lookup: {
          from: 'books',
            localField: '_id',
            foreignField: 'author_id',
            as: 'author_books'
          
        }
      }
    ]).then(result => {
      console.log(result);
      return res.json(result);
    }).catch(err => {
      console.error(err);
      throw err;
    }); }
  else{
   Book.find(query)
    .then(function(book) {
      if (!book) {
        return res.status(401).json({ message: 'There seems to be a problem fetching book according to given params' });
      }
      return res.json(book);
    }).catch(function(err) {
      throw err;
    });
} }