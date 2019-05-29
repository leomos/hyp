
var scriptsToLoad = [
  'utils.js',
  'Event.js',
  'UserModel.js',
  'UserNavbarView.js',
  'UserNavbarController.js',
];

$(function () {
  $.when.apply($, scriptsToLoad.map(scriptToLoad => $.loadScript('/assets/js/'+scriptToLoad))).done(function () {
    var userModel = new UserModel();
    var userNavbarView = new UserNavbarView(userModel);
    var userNavbarController = new UserNavbarController(userModel, userNavbarView);

    userModel.getDetails();
  });
});