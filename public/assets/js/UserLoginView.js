var UserLoginView = function(model) {
  this.model = model;
  this.loginEvent = new Event(this);

  this.init();
};

UserLoginView.prototype = {

  init: function () {

    // create children
    this.$container = $('#login-container');
    this.$emailInput = this.$container.find('#email-input');
    this.$passwordInput = this.$container.find('#password-input');
    this.$loginButton = this.$container.find('#login-button');
    this.$loginSpinner = this.$container.find('#login-spinner');
    this.$loginToast = $('#login-toast');
    this.$loginToastBody = this.$loginToast.find('#login-toast-body');

    // setup handlers
    this.loginButtonHandler = this.loginButton.bind(this);
    this.loginHandler = this.login.bind(this);

    // enable
    this.$loginButton.click(this.loginButtonHandler);
    this.model.loginEvent.attach(this.loginHandler);

  },

  loginButton: function () {
    this.$loginSpinner.show();
    this.loginEvent.notify({
      email: this.$emailInput.val(),
      password: this.$passwordInput.val(),
    });
  },

  login: function (sender, args) {
    this.$loginSpinner.hide();
    if(args.user) {
      document.location.href = '/';
    } else if(args.error) {
      console.log(args.error);
      const message = args.error.message ? args.error.message : 'An error occurred';
      this.$loginToastBody.text(message);
      this.$loginToast.addClass('border');
      this.$loginToast.addClass('border-danger');
      this.$loginToast.toast('show');

      this.$emailInput.addClass('is-invalid');
      this.$passwordInput.addClass('is-invalid');

      setTimeout(function() {
        this.$emailInput.removeClass('is-invalid');
        this.$passwordInput.removeClass('is-invalid');
        this.$loginToast.removeClass('border');
        this.$loginToast.removeClass('border-danger');
      }.bind(this), 2000);
    }
  },

};


