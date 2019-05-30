var UserRegistrationController = function (model, view) {
  this.model = model;
  this.view = view;

  this.init();
};

UserRegistrationController.prototype = {

  init: function() {
    this.view.registerEvent.attach(this.registration.bind(this));
  },

  registration: function (sender, args) {
    this.model.register(args.email, args.password, args.first_name, args.last_name);
  },

};
