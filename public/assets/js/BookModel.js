var BookModel = function() {
  this.book = {};
  this.error = null;
  this.fetchBookEvent = new Event(this);
};

BookModel.prototype = {

  getBook: function() {
    return this.book;
  },

  fetchBook: function (id) {
    $.when(
      $.get('/books'),
      $.get('/authors'),
      $.get('/themes'),
      $.get('/genres'))
      .done(function (booksArguments, authorsArguments, themesArguments, genresArguments) {
        var bookFromAPI = booksArguments[0].find(function(currentBook){
          return currentBook.id === id;
        });

        if(!bookFromAPI) {
          return;
        }

        var authorsFromAPI = authorsArguments[0].filter(function(currentAuthor){
          return bookFromAPI.authors_ids.indexOf(currentAuthor.id) > -1;
        });

        var themesFromAPI = themesArguments[0].filter(function(currentTheme){
          return bookFromAPI.themes_ids.indexOf(currentTheme.id) > -1;
        });

        var genreFromAPI = genresArguments[0].find(function(currentGenre) {
          return bookFromAPI.genre_id === currentGenre.id;
        });

        console.log(bookFromAPI, authorsFromAPI, themesFromAPI, genreFromAPI);

      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        this.book = {};
        this.error = errorThrown;
        this.fetchAllBooksEvent.notify();
      }.bind(this));
  }
};