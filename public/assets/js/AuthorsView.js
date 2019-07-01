var AuthorsView = function(authorsModel) {
  this.authorsModel = authorsModel;

  this.init();
};

AuthorsView.prototype = {
  init: function () {
    // create children
    this.$authorsContainer = $('#authors-container');

    //setup handlers
    this.fetchAuthorsHandler = this.buildAuthorsList.bind(this);

    //enable
    this.authorsModel.fetchAuthorsEvent.attach(this.fetchAuthorsHandler);

  },

  buildAuthorsList: function() {
    var authors = this.authorsModel.getAuthors();

    var authorsContent = '';

    authors.forEach(function(author) {
      authorsContent += '' +
        '<div class="row mt-5">\n' +
        '    <div class="col col-xs-12 col-md-3 text-center"><img class="img-fluid author-picture rounded shadow"' +
        ' src="/assets/img/' + author.picture + '" /></div>\n' +
        '    <div class="col col-md-9">\n' +
        '        <h4>' + author.first_name + ' ' + author.last_name + '</h4>\n' +
        '        <h5 class="text-secondary">' + author.birthdate + (author.deathdate !== null ? ' / ' + author.deathdate : '' ) + '</h5>\n' +
        '        <p class="text-truncate">' + author.biography + '</p>' +
        '        <a href="#">Learn more</a></div>\n' +
        '</div>';
    });

    this.$authorsContainer.html(authorsContent);
  },
};