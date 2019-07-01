
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
  'BreadcrumbsModel.js',
  'BreadcrumbsView.js',
  'AuthorModel.js',
  'AuthorView.js',
];

$(function () {
  $.when.apply($, scriptsToLoad.map(function(scriptToLoad){return $.loadScript('/assets/js/'+scriptToLoad)})).done(function () {
    var userModel = new UserModel();
    var userNavbarView = new UserNavbarView(userModel);
    var userNavbarController = new UserNavbarController(userModel, userNavbarView);
    var breadcrumbsModel = new BreadcrumbsModel();
    var breadcrumbsView = new BreadcrumbsView(breadcrumbsModel);
    var authorModel = new AuthorModel();
    var authorView = new AuthorView(authorModel, userModel, breadcrumbsModel);

    userModel.getDetails();
    breadcrumbsModel.addBreadcrumb('Home', '/index.html');
    breadcrumbsModel.addBreadcrumb('Authors', '/pages/authors.html');
  });
});