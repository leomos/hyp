var BooksModel = function() {
  this.books = [];
  this.error = null;
  this.fetchAllBooksEvent = new Event(this);
};

BooksModel.prototype = {

  getBooks: function() {
    return this.books;
  },

  fetchAllBooks: function () {
    $.when($.get('/books'), $.get('/authors'))
      .done(function(booksArguments, authorsArguments) {
        var data = booksArguments[0].map(function(book){
          return {
            id: book.id,
            title: book.title,
            abstract: book.abstract,
            picture: book.picture,
            authors: authorsArguments[0]
              .filter(function(author){return book.authors_ids.indexOf(author.id) > -1})
              .map(function(bookAuthor){return bookAuthor.first_name + ' ' + bookAuthor.last_name}),
            hasEvents: book.events_ids.length > 0,
            genre_id: book.genre_id,
            themes_ids: book.themes_ids,
            is_favorite: book.is_favorite,
            is_bestseller: book.is_bestseller,
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