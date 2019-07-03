var UserNavbarView = function(model) {
  this.model = model;
  this.logoutEvent = new Event(this);

  this.init();
};

UserNavbarView.prototype = {

  init: function () {

    // create children
    this.$container = $('#user-container');
    this.$userButton = this.$container.find('#user-button');
    this.$userLabel = this.$container.find('#user-label');
    this.$userMenu = this.$container.find('#user-menu');
    this.$logoutLink = this.$container.find('#logout-link');
    this.$userSpinner = this.$container.find('#user-spinner');
    this.$userCart = $('#user-cart');

    // setup handlers
    this.getDetailsHandler = this.show.bind(this);
    this.loginHandler = this.show.bind(this);
    this.logoutHandler = this.logoutLink.bind(this);
    this.startedGetDetailsHandler = this.showSpinner.bind(this);
    this.startedLogoutHandler = this.showSpinner.bind(this);

    // enable
    this.model.getDetailsEvent.attach(this.getDetailsHandler);
    this.model.loginEvent.attach(this.loginHandler);
    this.model.logoutEvent.attach(this.loginHandler);
    this.model.startedGetDetailsEvent.attach(this.startedGetDetailsHandler);
    this.model.startedLogoutEvent.attach(this.startedLogoutHandler);

    this.buildCartButton(null);
  },

  logoutLink: function() {
    this.logoutEvent.notify();
  },

  show: function(sender, args) {
    this.$userSpinner.hide();
    this.buildMenu(args.user);
    this.buildCartButton(args.user);
  },

  buildCartButton: function(user) {
    if(user) {
      this.$userCart.attr('href', '/pages/cart.html');
      this.$userCart.find('button').prop('disabled', false);
    } else {
      this.$userCart.removeAttr('href');
      this.$userCart.find('button').prop('disabled', true);
    }
  },

  buildMenu: function (user) {
    if(user) {
      this.$userLabel.text(user.first_name + ' ' + user.last_name);
      this.$userMenu.html('<a role="presentation" class="dropdown-item" href="#" id="logout-link">Logout</a>');
      
      this.$logoutLink = this.$container.find('#logout-link');
      this.$logoutLink.click(this.logoutHandler);


    } else {
      var redirect = encodeURIComponent(document.location.href);
      this.$userLabel.text('Sign In');
      this.$userMenu.html(
        '<a role="presentation" class="dropdown-item" href="/pages/login.html?redirect='+redirect+'" id="">Login</a>' +
        '<a role="presentation" class="dropdown-item" href="/pages/registration.html?redirect='+redirect+'" id="">Register</a>');
    }
  },

  showSpinner: function(sender, args) {
    this.$userSpinner.show();
  },

};