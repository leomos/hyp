
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
  'BooksModel.js',
  'BooksView.js',
  'BooksController.js',
  'BookFilterModel.js',
  'BookFilterView.js',
  'BookFilterController.js',
  'BestsellersView.js',
  'FavoritesView.js',
];

$(function () {
  $.when.apply($, scriptsToLoad.map(function(scriptToLoad){return $.loadScript('/assets/js/'+scriptToLoad)})).done(function () {
    var userModel = new UserModel();
    var userNavbarView = new UserNavbarView(userModel);
    var userNavbarController = new UserNavbarController(userModel, userNavbarView);
    var bookFilterModel = new BookFilterModel();
    var bookFilterView = new BookFilterView(bookFilterModel);
    var bookFilterController = new BookFilterController(bookFilterModel, bookFilterView);
    var booksModel = new BooksModel();
    var booksView = new BooksView(booksModel, userModel, bookFilterModel);
    var booksController = new BooksController(booksModel, booksView);
    var bestsellersView = new BestsellersView(booksModel, userModel);
    var favoritesView = new FavoritesView(booksModel, userModel);


    userModel.getDetails();
    bookFilterModel.fetchAvailableFilters();
    booksModel.fetchAllBooks();
  });
});