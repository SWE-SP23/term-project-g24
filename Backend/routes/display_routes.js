module.exports = function(app) {
    var displayHandlers = require('../Controllers/DisplayController');
    // List Routes
    app.route('/author')
        .get(displayHandlers.get_author);
    app.route('/book')
        .get(displayHandlers.get_book);
};
