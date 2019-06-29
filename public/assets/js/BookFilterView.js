var BookFilterView = function(bookFilterModel) {
  this.bookFilterModel = bookFilterModel;
  this.filterModifiedEvent = new Event();

  this.init();
};

BookFilterView.prototype = {
  init: function () {
    // create children
    this.$container = $('#dropdowns-container');
    this.$genres = this.$container.find('#dropdown-genres');
    this.$themes = this.$container.find('#dropdown-themes');
    this.$genresForm = this.$genres.find('#dropdown-genres-form');
    this.$themesForm = this.$themes.find('#dropdown-themes-form');

    // setup handlers
    this.fetchAvailableFiltersHandler = this.buildFilterDropdowns.bind(this);
    this.modifyGenresFilterHandler = this.buildGenresDropdown.bind(this);
    this.modifyThemesFilterHandler = this.buildThemesDropdown.bind(this);

    // enable
    this.bookFilterModel.fetchAvailableFiltersEvent.attach(this.fetchAvailableFiltersHandler);
    this.bookFilterModel.modifyGenresFilterEvent.attach(this.modifyGenresFilterHandler);
    this.bookFilterModel.modifyThemesFilterEvent.attach(this.modifyThemesFilterHandler);
  },

  buildFilterDropdowns: function() {
    this.buildGenresDropdown();
    this.buildThemesDropdown();
  },

  buildGenresDropdown: function() {
    var genres = this.bookFilterModel.getAvailableGenres();
    var genresIdsToShow = this.bookFilterModel.getGenresIdsToShow();
    console.log(genresIdsToShow);
    this.$genresForm.html(
      '<div class="form-check py-1">' +
      ' <input class="form-check-input" type="checkbox" id="checkbox-all-genres">' +
      ' <label class="form-check-label" for="checkbox-all-genres">All literary genres</label>' +
      '</div>'
    );
    genres.forEach(function (genre) {
      var genreCheckbox = $(document.createElement('input'));
      genreCheckbox.prop({
        class: 'form-check-input',
        type: 'checkbox',
        id: 'checkbox-genre-'+genre.id
      });

      this.$genresForm.append(
        '<div class="form-check py-1">' +
        genreCheckbox[0].outerHTML +
        ' <label class="form-check-label" for="checkbox-genre-' + genre.id + '">'+ genre.name.capitalizeFirstLetter() + '</label>' +
        '</div>');

      genreCheckbox = $('#checkbox-genre-'+genre.id);
      genreCheckbox.prop('checked', genresIdsToShow.indexOf(genre.id) > -1);
      var me = this;
      genreCheckbox.on('change', function(){
        me.filterModifiedEvent.notify({
          filter: 'genre',
          id: genre.id,
          checked: this.checked
        });
      });
    }.bind(this));

    var allGenresCheckbox = $('#checkbox-all-genres');
    allGenresCheckbox.prop('checked', (genres.length === genresIdsToShow.length));
    var me = this;
    allGenresCheckbox.on('change', function(){
      me.filterModifiedEvent.notify({
        filter: 'genre',
        id: -1,
        checked: this.checked
      });
    });
  },

  buildThemesDropdown: function() {
    var themes = this.bookFilterModel.getAvailableThemes();
    var themesIdsToShow = this.bookFilterModel.getThemesIdsToShow();
    console.log(themesIdsToShow);
    this.$themesForm.html(
      '<div class="form-check py-1">' +
      ' <input class="form-check-input" type="checkbox" id="checkbox-all-themes">' +
      ' <label class="form-check-label" for="checkbox-all-themes">All literary themes</label>' +
      '</div>'
    );
    themes.forEach(function (theme) {
      var themeCheckbox = $(document.createElement('input'));
      themeCheckbox.prop({
        class: 'form-check-input',
        type: 'checkbox',
        id: 'checkbox-theme-'+theme.id
      });

      this.$themesForm.append(
        '<div class="form-check py-1">' +
        themeCheckbox[0].outerHTML +
        ' <label class="form-check-label" for="checkbox-theme-' + theme.id + '">'+ theme.name.capitalizeFirstLetter() + '</label>' +
        '</div>');

      themeCheckbox = $('#checkbox-theme-'+theme.id);
      themeCheckbox.prop('checked', themesIdsToShow.indexOf(theme.id) > -1);
      var me = this;
      themeCheckbox.on('change', function(){
        me.filterModifiedEvent.notify({
          filter: 'theme',
          id: theme.id,
          checked: this.checked
        });
      });
    }.bind(this));

    var allThemesCheckbox = $('#checkbox-all-themes');
    allThemesCheckbox.prop('checked', (themes.length === themesIdsToShow.length));
    var me = this;
    allThemesCheckbox.on('change', function(){
      me.filterModifiedEvent.notify({
        filter: 'theme',
        id: -1,
        checked: this.checked
      });
    });
  },
};