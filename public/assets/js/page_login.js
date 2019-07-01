
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserLoginView.js',
  'UserLoginController.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
  'BreadcrumbsModel.js',
  'BreadcrumbsView.js',
];

$(function () {
  $.when.apply($, scriptsToLoad.map(function(scriptToLoad){return $.loadScript('/assets/js/'+scriptToLoad)})).done(function () {
    var userModel = new UserModel();
    var userLoginView = new UserLoginView(userModel);
    var userLoginController = new UserLoginController(userModel, userLoginView);
    var userNavbarView = new UserNavbarView(userModel);
    var userNavbarController = new UserNavbarController(userModel, userNavbarView);
    var breadcrumbsModel = new BreadcrumbsModel();
    var breadcrumbsView = new BreadcrumbsView(breadcrumbsModel);

    userModel.getDetails();
    breadcrumbsModel.addBreadcrumb('Home', '/index.html');
    breadcrumbsModel.addBreadcrumb('Login', '/pages/login.html', true);
  });
});