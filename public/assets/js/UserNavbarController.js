var UserNavbarController = function (model, view) {
  this.model = model;
  this.view = view;

  this.init();
};

UserNavbarController.prototype = {

  init: function() {
    this.view.logoutEvent.attach(this.logout.bind(this));
  },

  logout: function (sender, args) {
    this.model.logout();
  },
};
