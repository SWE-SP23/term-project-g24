module.exports = function(app) {
    var userHandlers = require('../Controllers/UserpageController');
    // List Routes
    app.route('/all')
        .get(userHandlers.get_all_books);
    app.route('/addBook')
        .post(userHandlers.addToBooks);
    app.route('/removeBook')
        .post(userHandlers.removeFromBooks);
};
