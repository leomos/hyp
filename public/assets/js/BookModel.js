var BookModel = function() {
  this.books = [];
  this.error = null;
  this.fetchAllBooksEvent = new Event(this);
};

BookModel.prototype = {

  getBooks: function() {
    return this.books;
  },

  fetchAllBooks: function () {
    $.when($.get('/books'), $.get('/authors'))
      .done(function(booksArguments, authorsArguments) {
        const data = booksArguments[0].map(book => {
          return {
            id: book.id,
            title: book.title,
            abstract: book.abstract,
            picture: book.picture,
            authors: authorsArguments[0]
              .filter(author => book.authors_ids.indexOf(author.id) > -1)
              .map(bookAuthor => bookAuthor.first_name + ' ' + bookAuthor.last_name),
          }
        });
        this.books = data;
        this.error = null;
        this.fetchAllBooksEvent.notify();
      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        this.books = [];
        this.error = errorThrown;
        this.fetchAllBooksEvent.notify();
      }.bind(this));
  },
};