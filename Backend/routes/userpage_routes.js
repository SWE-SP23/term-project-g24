module.exports = function(app) {
    var userHandlers = require('../Controllers/UserpageController');
    // List Routes
    app.route('/all/:userId')
<<<<<<< HEAD
        .post(userHandlers.get_all_books);
    app.route('/:userId/:bookId')
        .post(userHandlers.addToBooks);
   app.route('/remove/:userId/:bookId')
=======
        .get(userHandlers.get_all_books);
    app.route('/:userId/:bookId')
        .post(userHandlers.addToBooks);
    app.route('/remove/:userId/:bookId')
>>>>>>> merge-branch
        .post(userHandlers.removeFromBooks);
};
