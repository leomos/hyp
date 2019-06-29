var BookFilterController = function (model, view) {
  this.model = model;
  this.view = view;

  this.init();
};

BookFilterController.prototype = {

  init: function() {
    this.view.filterModifiedEvent.attach(this.filterModified.bind(this));
  },

  filterModified: function (sender, args) {
    console.log(args);
    if(args.filter === 'genre') {
      if(args.checked) {
        if(args.id === -1) {
          this.model.addAllGenresFilters();
        } else {
          this.model.addGenreFilter(args.id);
        }
      } else {
        if(args.id === -1) {
          this.model.removeAllGenresFilters();
        } else {
          this.model.removeGenreFilter(args.id);
        }
      }
    } else if(args.filter === 'theme') {
      if(args.checked) {
        if(args.id === -1) {
          this.model.addAllThemesFilters();
        } else {
          this.model.addThemeFilter(args.id);
        }
      } else {
        if(args.id === -1) {
          this.model.removeAllThemesFilters();
        } else {
          this.model.removeThemeFilter(args.id);
        }
      }
    }
  },
};
