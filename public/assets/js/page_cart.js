
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
  'BreadcrumbsModel.js',
  'BreadcrumbsView.js',
  'CartModel.js',
  'CartView.js',
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
    var cartView = new CartView(cartModel);
    var cartController = new CartController(cartModel, cartView);

    window.c = cartModel;

    userModel.getDetails();
    breadcrumbsModel.addBreadcrumb('Home', '/index.html');
    breadcrumbsModel.addBreadcrumb('Cart', '/pages/cart.html', true);
    cartModel.fetchCart();
  });
});