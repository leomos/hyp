var UserLoginController = function (model, view) {
  this.model = model;
  this.view = view;

  this.init();
};

UserLoginController.prototype = {

  init: function() {
    this.view.loginEvent.attach(this.login.bind(this));
  },

  login: function (sender, args) {
    this.model.login(args.email, args.password);
  },

};
