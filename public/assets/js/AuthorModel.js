var AuthorModel = function() {
  this.author = {};
  this.books = [];
  this.error = null;
  this.fetchAuthorEvent = new Event(this);
  this.fetchBooksEvent = new Event(this);
};

AuthorModel.prototype = {

  getAuthor: function() {
    return this.author;
  },

  getBooks: function() {
    return this.books;
  },

  getError: function() {
    return this.error;
  },


  fetchAuthor: function (id) {
    $.when($.get('/authors/'+id))
      .done(function (authorArguments) {
        this.author = authorArguments;

        var booksRequestsPromises = this.author.books_ids.map(function(bookId){
          return $.get('/books/'+bookId);
        });
        $.when.apply(null, booksRequestsPromises)
          .done(function() {
            if(arguments.length === 3 && (typeof arguments[1])==="string") {
              this.books.push(arguments[0]);
            } else {
              for (var i = 0; i < arguments.length; i++) {
                this.books.push(arguments[i][0]);
              }
            }
            this.fetchBooksEvent.notify();
          }.bind(this));

        this.fetchAuthorEvent.notify();
      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        this.author = {};
        this.books = [];
        this.error = errorThrown;
        this.fetchAuthorEvent.notify();
        this.fetchBooksEvent.notify();
      }.bind(this));
  }
};