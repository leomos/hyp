
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
  'BookModel.js',
  'BookView.js',
  //'BookController.js',
];

$(function () {
  $.when.apply($, scriptsToLoad.map(function(scriptToLoad){return $.loadScript('/assets/js/'+scriptToLoad)})).done(function () {
    var userModel = new UserModel();
    var userNavbarView = new UserNavbarView(userModel);
    var userNavbarController = new UserNavbarController(userModel, userNavbarView);
    var bookModel = new BookModel();
    var bookView = new BookView(bookModel, userModel);

    userModel.getDetails();
  });
});