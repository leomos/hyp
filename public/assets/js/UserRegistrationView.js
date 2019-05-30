var UserRegistrationView = function(model) {
  this.model = model;
  this.registerEvent = new Event(this);

  this.init();
};

UserRegistrationView.prototype = {

  init: function () {

    // create children
    this.$container = $('#registration-container');
    this.$nameInput = this.$container.find('#name-input');
    this.$surnameInput = this.$container.find('#surname-input');
    this.$emailInput = this.$container.find('#email-input');
    this.$passwordInput = this.$container.find('#password-input');
    this.$registerButton = this.$container.find('#register-button');
    this.$clearButton = this.$container.find('#clear-button');
    this.$registerSpinner = this.$container.find('#register-spinner');
    this.$registrationToast = $('#registration-toast');
    this.$registrationToastBody = this.$registrationToast.find('#registration-toast-body');

    // setup handlers
    this.registerButtonHandler = this.registerButton.bind(this);
    this.clearButtonHandler = this.clearButton.bind(this);

    this.registerHandler = this.register.bind(this);

    // enable
    this.$registerButton.click(this.registerButtonHandler);
    this.$clearButton.click(this.clearButtonHandler);
    this.model.registerEvent.attach(this.registerHandler);

  },

  registerButton: function() {
    this.$registerSpinner.show();
    this.registerEvent.notify({
      first_name: this.$nameInput.val(),
      last_name: this.$surnameInput.val(),
      email: this.$emailInput.val(),
      password: this.$passwordInput.val(),
    });
  },

  clearButton: function() {
    this.$nameInput.val('');
    this.$surnameInput.val('');
    this.$emailInput.val('');
    this.$passwordInput.val('');
  },

  register: function(sender, args) {
    this.$registerSpinner.hide();
    if(args.user) {
      this.$registrationToastBody.text('Registration successful! You will be redirected to the login page.');
      this.$registrationToast.addClass('border border-success');
      this.$registrationToast.toast('show');

      setTimeout(function() {
        this.$registrationToast.removeClass('border border-success');
        document.location.href = '/pages/login.html';
      }.bind(this), 2000);

    } else if(args.error) {
      const error = args.error;
      this.$registrationToastBody.text(error.message);
      this.$registrationToast.addClass('border border-danger');
      this.$registrationToast.toast('show');

      if(error.details && error.details.invalidFields) {
        let invalidatedInputs = error.details.invalidFields.map(invalidField => {
          switch(invalidField) {
            case 'email':
              return this.$emailInput;
              break;
            case 'password':
              return this.$passwordInput;
              break;
            case 'first_name':
              return this.$nameInput;
              break;
            case 'last_name':
              return this.$surnameInput;
              break;
          }
        });

        for(let invalidatedInput of invalidatedInputs) {
          invalidatedInput.addClass('is-invalid');
        }

        setTimeout(function() {
          for(let invalidatedInput of invalidatedInputs) {
            invalidatedInput.removeClass('is-invalid');
          }
          this.$registrationToast.removeClass('border border-danger');
        }.bind(this), 2000);
      }
    } else {
      this.$registrationToastBody.text('An error occurred. Please try again.');
      this.$registrationToast.addClass('border border-danger');
      this.$registrationToast.toast('show');

      setTimeout(function() {
        this.$registrationToast.removeClass('border border-danger');
      }.bind(this), 2000);
    }
  },

  login: function (sender, args) {
    this.$loginSpinner.hide();
    if(args.user) {
      document.location.href = '/';
    } else if(args.error) {
      const message = args.error.message ? args.error.message : 'An error occurred';
      this.$loginToastBody.text(message);
      this.$loginToast.toast('show');

      this.$emailInput.addClass('is-invalid');
      this.$passwordInput.addClass('is-invalid');

      setTimeout(function() {
        this.$emailInput.removeClass('is-invalid');
        this.$passwordInput.removeClass('is-invalid');
      }.bind(this), 2000);
    }
  },

};


