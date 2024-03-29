
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
  'BreadcrumbsModel.js',
  'BreadcrumbsView.js',
  'BookModel.js',
  'BookView.js',
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
    var cartModel = new CartModel();
    var bookModel = new BookModel();
    var bookView = new BookView(bookModel, userModel, breadcrumbsModel, cartModel);
    var cartController = new CartController(cartModel, bookView);

    userModel.getDetails();
    breadcrumbsModel.addBreadcrumb('Home', '/index.html');
    breadcrumbsModel.addBreadcrumb('Books', '/pages/books.html');
    cartModel.fetchCart();
  });
});