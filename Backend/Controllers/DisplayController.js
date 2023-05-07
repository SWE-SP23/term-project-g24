var mongoose = require('mongoose'),
  Authors = mongoose.model('Authors');
  Book = mongoose.model('Book');

  exports.get_author = function(req,res){
    Authors.findOne({_id: req.body._id})
      .then(function(author) {
        if(!author){
            return res.status(401).json({ message: 'There seems to be a problem fetching data about author' });
        }
        return res.json(res);
      }.catch(function(err){
        throw err;
      });
  }  
  
  exports.get_book = function(req,res){
    Book.findOne({_id: req.body._id})
      .then(function(author) {
        if(!author){
            return res.status(401).json({ message: 'There seems to be a problem fetching data about book' });
        }
        return res.json(res);
      }.catch(function(err){
        throw err;
      });
  }