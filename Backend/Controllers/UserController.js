var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');

exports.register = function(req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save()
    .then(user => {
      user.hash_password = undefined;
      const token = jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs', { expiresIn: "2h" });
      return res.header('Authorization', `Bearer ${token}`).json({ message: "User registered successfully" });
    })
    .catch(err => {
      return res.status(400).send({
        message: err
      });
    });
};

exports.sign_in = function(req, res) {
  User.findOne({ email: req.body.email })
    .then(function(user) {
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      const token = jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs', { expiresIn: "2h" });
      return res.header('Authorization', `Bearer ${token}`).json({ message: "User logged in successfully" });
    })
    .catch(function(err) {
      throw err;
    });
};
  

  exports.loginRequired = function(req, res, next) {
    if (req.user) {
      Promise.resolve(next());
    } else {
      Promise.reject(new Error('Unauthorized user!!')).catch((error) => {
        return res.status(401).json({ message: error.message });
      });
    }
  };
  
  exports.profile = function(req, res, next) {
    if (req.user) {
      res.send(req.user);
      Promise.resolve(next());
    } else {
      Promise.reject(new Error('Invalid token')).catch((error) => {
        return res.status(401).json({ message: error.message });
      });
    }
  };