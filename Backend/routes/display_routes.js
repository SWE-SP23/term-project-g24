module.exports = function(app) {
    var displayHandlers = require('../Controllers/DisplayController');
    // List Routes
    app.route('/author')
        .post(displayHandlers.get_author);
    app.route('/book')
        .get(displayHandlers.get_book);
    app.route('/search_by_parameter')
        .post(displayHandlers.search_by_parameter);
    app.route('/author_books')
        .get(displayHandlers.get_author_books);
    app.route('/addreview')
        .post(displayHandlers.add_comment);
};