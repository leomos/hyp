var UserModel = function () {
  this.user = null;
  this.loginEvent = new Event(this);
  this.logoutEvent = new Event(this);
  this.getDetailsEvent = new Event(this);
  this.startedGetDetailsEvent = new Event(this);
  this.startedLogoutEvent = new Event(this);

  this.init();
};

UserModel.prototype = {

  init: function() {
  },
  
  login: function (email, password) {
    $.ajax({
      url: '/users/login',
      data: JSON.stringify({
        email: email,
        password: password,
      }),
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
    })
      .done(function(data) {
        this.loginEvent.notify({
          user: data,
          error: null,
        });
        this.getDetails();
      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        this.loginEvent.notify({
          user: null,
          error: jqXHR.responseJSON,
        });
      }.bind(this));
  },

  logout: function () {
    this.startedLogoutEvent.notify();
    /**
     * We use always because, even if the request was not
     * fine on the server side, we still want to be logged out
     */
    $.get('/users/logout')
      .always(function () {
        this.user = null;
        this.logoutEvent.notify({
          user: null,
        });
      }.bind(this));
  },

  getDetails: function() {
    this.startedGetDetailsEvent.notify({});
    $.get('/users/me')
      .done(function (data) {
        this.user = data;
      }.bind(this))
      .fail(function (data) {
        this.user = null;
      }.bind(this))
      .always(function() {
        this.getDetailsEvent.notify({
          user: this.user,
        });
      }.bind(this));
  }
};