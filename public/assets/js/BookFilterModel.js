var BookFilterModel = function() {
  // *IdsToShow is an array containing all the ids that should be shown
  this.genresIdsToShow = null;
  this.themesIdsToShow = null;

  this.availableGenres = [];
  this.availableThemes = [];
  this.error = null;

  this.modifyGenresFilterEvent = new Event(this);
  this.modifyThemesFilterEvent = new Event(this);
  this.fetchAvailableFiltersEvent = new Event(this);
};

BookFilterModel.prototype = {

  getGenresIdsToShow: function() {
    return this.genresIdsToShow;
  },

  getThemesIdsToShow: function() {
    return this.themesIdsToShow;
  },

  addGenreFilter: function(id) {
    if(this.availableGenres.map(function(genre){return genre.id}).indexOf(id) > -1 && this.genresIdsToShow.indexOf(id) < 0) {
      this.genresIdsToShow.push(id);
      this.modifyGenresFilterEvent.notify();
    }
  },

  addAllGenresFilters: function() {
    this.genresIdsToShow = this.availableGenres.map(function(genre){
      return genre.id;
    });
    this.modifyGenresFilterEvent.notify();
  },

  removeAllGenresFilters: function(){
    this.genresIdsToShow = [];
    this.modifyGenresFilterEvent.notify();
  },

  removeGenreFilter: function(id) {
    var i = this.genresIdsToShow.indexOf(id);
    if(i > -1) {
      this.genresIdsToShow.splice(i, 1);
      this.modifyGenresFilterEvent.notify();
    }
  },

  addThemeFilter: function(id) {
    if(this.availableThemes.map(function(theme){return theme.id}).indexOf(id) > -1 && this.themesIdsToShow.indexOf(id) < 0) {
      this.themesIdsToShow.push(id);
      this.modifyThemesFilterEvent.notify();
    }
  },

  addAllThemesFilters: function() {
    this.themesIdsToShow = this.availableThemes.map(function(theme){
      return theme.id;
    });
    this.modifyThemesFilterEvent.notify();
  },

  removeAllThemesFilters: function(){
    this.themesIdsToShow = [];
    this.modifyThemesFilterEvent.notify();
  },

  removeThemeFilter: function(id) {
    var i = this.themesIdsToShow.indexOf(id);
    if(i > -1) {
      this.themesIdsToShow.splice(i, 1);
      this.modifyThemesFilterEvent.notify();
    }
  },

  getAvailableGenres: function() {
    return this.availableGenres;
  },

  getAvailableThemes: function() {
    return this.availableThemes;
  },

  fetchAvailableFilters: function() {
    $.when($.get('/genres'), $.get('/themes'))
      .done(function(genresArguments, themesArguments) {
        this.availableGenres = genresArguments[0];
        this.availableThemes = themesArguments[0];
        this.genresIdsToShow = genresArguments[0].map(function(genre) {
          return genre.id;
        });
        this.themesIdsToShow = themesArguments[0].map(function(theme) {
          return theme.id;
        });
        this.error = null;
        this.fetchAvailableFiltersEvent.notify();
      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
      }.bind(this));
  },

  filterBooks: function(books) {
    return books.filter(function (book) {
      var shouldBeShowed = true;
      if(this.genresIdsToShow) {
        shouldBeShowed = this.genresIdsToShow.indexOf(book.genre_id) > -1;
        console.log(shouldBeShowed);
      }
      if(this.themesIdsToShow) {
        shouldBeShowed = shouldBeShowed && book.themes_ids.some(function(themeId){
          return this.themesIdsToShow.indexOf(themeId) > -1;
        }.bind(this));
      }
      return shouldBeShowed;
    }.bind(this));
  },
};