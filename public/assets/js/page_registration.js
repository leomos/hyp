
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
  'UserRegistrationView.js',
  'UserRegistrationController.js',
];

$(function () {
  $.when.apply($, scriptsToLoad.map(function(scriptToLoad){return $.loadScript('/assets/js/'+scriptToLoad)})).done(function () {
    var userModel = new UserModel();
    var userNavbarView = new UserNavbarView(userModel);
    var userNavbarController = new UserNavbarController(userModel, userNavbarView);
    var userRegistrationView = new UserRegistrationView(userModel);
    var userRegistrationController = new UserRegistrationController(userModel, userRegistrationView);


    userModel.getDetails();
  });
});