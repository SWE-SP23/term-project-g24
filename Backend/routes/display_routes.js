module.exports = function(app) {
    var displayHandlers = require('../Controllers/DisplayController');
    // List Routes
    app.route('/author/:authorId')
        .get(displayHandlers.get_author);
    app.route('/book/:bookId')
        .get(displayHandlers.get_book);
};
