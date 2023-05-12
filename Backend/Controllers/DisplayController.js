const mongoose = require('mongoose');
const Author = mongoose.model('author');
const Book = mongoose.model('book'),
jwt = require('jsonwebtoken');

<<<<<<< HEAD
exports.get_author = function(req, res) {
  console.log(req);
  console.log(req.body);
=======
module.exports.get_author = async function(req, res) {
>>>>>>> tests-hayam
  const authorId = req.body._id;

 if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: 'Invalid author ID' ,});
  }

  try {
    const author = await Author.findById(req.body._id);
    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }
    console.log('returned:',req.body._id);
    return res.status(200).json(author.toJSON());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}


exports.add_comment = async function(req,res){
    const token = req.headers.authorization;
    console.log(token);
    const decoded = jwt.verify(token, "RESTFULAPIs");
    const userId = decoded._id;
    const userName = decoded.fullName;
    console.log(userId); // prints "1234567890"
    console.log(userName);

    const bookId = req.body._id;
     if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }
    const book = await Book.findById({ _id: new mongoose.Types.ObjectId(req.body._id) });
   console.log(book);
    const body = req.body.body;
    const r = {
      user: userId,
      user_name:userName,
      body:body,
      date: Date.now()
    };
    book.reviews.push(r);
    await book.save();
    return res.status(200).json(r);
}


module.exports.get_book = async function(req, res) {
  const bookId = req.body._id;
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }
  try{
    const result = await Book.aggregate([
     { $match: { _id:  new mongoose.Types.ObjectId(bookId) } },
    {
      $lookup: {
        from: 'authors',
        localField: 'author_id',
        foreignField: '_id',
        as: 'author_data'
      }
    }
  ]);

    if(!result){
      return res.status(404).json({
        message: "book not found",
      });
    }

    console.log('inside',result);
  return res.status(200).json(result.toJSON());
  }
catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.get_author_books = async function(req, res) {
  const authorId = req.body.author_id;
  console.log(authorId);
  const bookIds = req.body.author_books;
  console.log(bookIds);
  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: 'Invalid author ID' });
  }
  try {
    const result = await Book.aggregate([
      { $match: { _id: { $in: bookIds.map(id => new mongoose.Types.ObjectId(id)) } } }
    ]);
    console.log('result:',result);
    if (!result) {
      return res.status(404).json({
        message: "author books not found",
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    throw err;
  }
};


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
  return res.status(200).json(result);
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
      return res.status(200).json(result);
    }).catch(err => {
      console.error(err);
      throw err;
    }); }
  else{

   try{  
    const book = Book.find(query);
    console.log('search book:',book);
    if (!book) {
      return res.status(401).json({ message: 'There seems to be a problem fetching book according to given params' });
    }
    return res.status(200).json(book);
    
   }
    catch(err) {
      throw err;
    }
} };
