
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
  'BooksModel.js',
  'BooksView.js',
  'BooksController.js',
];

$(function () {
  $.when.apply($, scriptsToLoad.map(scriptToLoad => $.loadScript('/assets/js/'+scriptToLoad))).done(function () {
    var userModel = new UserModel();
    var userNavbarView = new UserNavbarView(userModel);
    var userNavbarController = new UserNavbarController(userModel, userNavbarView);
    var booksModel = new BooksModel();
    var booksView = new BooksView(booksModel, userModel);
    var booksController = new BooksController(booksModel, booksView);

    userModel.getDetails();
    booksModel.fetchAllBooks();
  });
});