
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
  'BreadcrumbsModel.js',
  'BreadcrumbsView.js',
  'BooksModel.js',
  'BooksView.js',
  'BooksController.js',
  'BookFilterModel.js',
  'BookFilterView.js',
  'BookFilterController.js',
  'BestsellersView.js',
  'FavoritesView.js',
  'CartModel.js',
  'CartController.js',
];

$(function () {
  $.when.apply($, scriptsToLoad.map(function(scriptToLoad){return $.loadScript('/assets/js/'+scriptToLoad)})).done(function () {
    var userModel = new UserModel();
    var userNavbarView = new UserNavbarView(userModel);
    var userNavbarController = new UserNavbarController(userModel, userNavbarView);
    var breadcrumbsModel = new BreadcrumbsModel();
    var breadcrumbsView = new BreadcrumbsView(breadcrumbsModel);
    var bookFilterModel = new BookFilterModel();
    var bookFilterView = new BookFilterView(bookFilterModel);
    var bookFilterController = new BookFilterController(bookFilterModel, bookFilterView);
    var cartModel = new CartModel();
    var booksModel = new BooksModel();
    var booksView = new BooksView(booksModel, userModel, bookFilterModel, cartModel);
    var booksController = new BooksController(booksModel, booksView);
    var bestsellersView = new BestsellersView(booksModel, userModel);
    var favoritesView = new FavoritesView(booksModel, userModel);
    var cartController = new CartController(cartModel, booksView);

    userModel.getDetails();
    breadcrumbsModel.addBreadcrumb('Home', '/index.html');
    breadcrumbsModel.addBreadcrumb('Books', '/pages/books.html', true);
    bookFilterModel.fetchAvailableFilters();
    booksModel.fetchAllBooks();
    cartModel.fetchCart();
  });
});