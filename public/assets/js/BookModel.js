var BookModel = function() {
  this.book = {};
  this.authors = [];
  this.themes = [];
  this.genres = [];
  this.reviews = [];
  this.events = [];
  this.error = null;
  this.fetchBookEvent = new Event(this);
  this.fetchBookReviewsEvent = new Event(this);
  this.fetchBookEventsEvent = new Event(this);
};

BookModel.prototype = {

  getBook: function() {
    return this.book;
  },

  getAuthors: function() {
    return this.authors;
  },

  getThemes: function() {
    return this.themes;
  },

  getGenres: function() {
    return this.genres;
  },

  getReviews: function() {
    return this.reviews;
  },

  getEvents: function() {
    return this.events;
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


        var reviewsRequestsPromises = bookFromAPI.reviews_ids.map(function(reviewId){
          return $.get('/reviews/'+reviewId);
        });
        $.when.apply(null, reviewsRequestsPromises)
          .done(function() {
            if(arguments.length === 3 && (typeof arguments[1])==="string") {
              this.reviews.push(arguments[0]);
            } else {
              for (var i = 0; i < arguments.length; i++) {
                this.reviews.push(arguments[i][0]);
              }
            }
            this.fetchBookReviewsEvent.notify();
          }.bind(this));

        var eventsRequestsPromises = bookFromAPI.events_ids.map(function(eventId){
          return $.get('/events/'+eventId);
        });
        $.when.apply(null, eventsRequestsPromises)
          .done(function() {
            if(arguments.length === 3 && (typeof arguments[1])==="string") {
              this.events.push(arguments[0]);
            } else {
              for (var i = 0; i < arguments.length; i++) {
                this.events.push(arguments[i][0]);
              }
            }
            this.fetchBookEventsEvent.notify();
          }.bind(this));

        this.book = bookFromAPI;
        this.authors = authorsFromAPI;
        this.themes = themesFromAPI;
        this.genres = genreFromAPI;
        this.fetchBookEvent.notify();
      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        this.book = {};
        this.error = errorThrown;
        this.fetchBookEvent.notify();
      }.bind(this));
  }
};