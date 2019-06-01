
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
  'BookModel.js',
  'BooksView.js'
];

$(function () {
  $.when.apply($, scriptsToLoad.map(scriptToLoad => $.loadScript('/assets/js/'+scriptToLoad))).done(function () {
    var userModel = new UserModel();
    var userNavbarView = new UserNavbarView(userModel);
    var userNavbarController = new UserNavbarController(userModel, userNavbarView);
    var bookModel = new BookModel();
    var booksView = new BooksView(bookModel, userModel);

    userModel.getDetails();
    bookModel.fetchAllBooks();
  });
});