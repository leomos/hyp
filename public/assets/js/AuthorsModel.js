var AuthorsModel = function() {
  this.authors = [];
  this.error = null;
  this.fetchAuthorsEvent = new Event(this);
};

AuthorsModel.prototype = {

  getAuthors: function() {
    return this.authors;
  },

  getError: function() {
    return this.error;
  },

  fetchAuthors: function () {
    $.when($.get('/authors'))
      .done(function (authorsArguments) {
        this.authors = authorsArguments;

        this.fetchAuthorsEvent.notify();
      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        this.authors = [];
        this.error = errorThrown;
        this.fetchAuthorsEvent.notify();
      }.bind(this));
  }
};