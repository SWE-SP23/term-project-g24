module.exports = function(app) {
    var userHandlers = require('../Controllers/UserpageController');
    // List Routes
    app.route('/all/:userId')
        .post(userHandlers.get_all_books);
    app.route('/:userId/:bookId')
        .post(userHandlers.addToBooks);
   app.route('/remove/:userId/:bookId')
        .post(userHandlers.removeFromBooks);
};
