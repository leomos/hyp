var AuthorView = function(authorModel, userModel, breadcrumbsModel) {
  this.authorModel = authorModel;
  this.authorId = null;
  this.breadcrumbsModel = breadcrumbsModel;
  this.userModel = userModel;

  this.init();
};

AuthorView.prototype = {
  init: function () {
    // create children
    this.$headerContainer = $('#header-container');
    this.$authorContainer = $('#author-container');
    this.$booksContainer = $('#books-container');

    //setup handlers
    this.fetchAuthorHandler = this.buildAuthorDetails.bind(this);
    this.fetchBooksHandler = this.buildBooksList.bind(this);

    //enable
    this.authorModel.fetchAuthorEvent.attach(this.fetchAuthorHandler);
    this.authorModel.fetchBooksEvent.attach(this.fetchBooksHandler);

    this.authorId = getUrlParameter('id');
    if(!this.authorId || !parseInt(this.authorId) ){
      this.showError();
      return;
    }
    this.authorModel.fetchAuthor(parseInt(this.authorId));
  },

  buildAuthorDetails: function() {
    if(this.authorModel.getError() !== null) {
      this.showError();
      return;
    }

    var author = this.authorModel.getAuthor();
    var authorName = author.first_name + ' ' + author.last_name;

    if(this.breadcrumbsModel) {
      this.breadcrumbsModel.addBreadcrumb(authorName, '/pages/author.html?id='+author.id, true);
    }

    this.$headerContainer.html('<h2>' + authorName + '</h2>');
    this.$authorContainer.html('' +
      '<div class="row">\n' +
      '    <div class="col"><img class="float-left mr-3 mb-3 author-picture rounded shadow"' +
      ' src="/assets/img/' + author.picture + '" />\n' +
      '        <h4>Biography</h4>\n' +
      '        <h5 class="text-secondary">' + author.birthdate + (author.deathdate ? ' / ' + author.deathdate : '') + '</h5>\n' +
      '        <p class="float-center">' + author.biography.replace(/\n/g, '<br>') + '</p>\n' +
      '    </div>\n' +
      '</div>')
  },

  buildBooksList: function() {
    var user = this.userModel.getUser();
    var books = this.authorModel.getBooks();
    var booksContent = '' +
      '<div class="row">\n' +
      '    <div class="col">\n' +
      '        <h4>Bibliography</h4>\n' +
      '    </div>\n' +
      '</div>' +
      '<div class="row">';

    books.forEach(function(book){
      booksContent += '' +
        '<div class="col col-12 col-sm-12 col-md-6 col-lg-4 mb-3">' +
        ' <div class="card h-100">' +
        '  <div class="row no-gutters h-100">' +
        '   <div class="col-4 h-100">' +
        '    <a href="/pages/book.html?id=' + book.id + '" class="text-decoration-none text-reset"><img' +
        ' class="card-img" src="/assets/img/'+ book.picture + '" style="max-height: 100%;"/></a>' +
        '   </div>' +
        '   <div class="col-8 d-flex flex-column h-100">' +
        '    <div class="card-body h-100">' +
        '     <h4 class="card-title"><a href="/pages/book.html?id=' + book.id + '" class="text-decoration-none text-reset">' + book.title + '</a></h4>' +
        '     <p class="card-text text-break">' + book.abstract.truncateWords(20) + '...</p>' +
        '    </div>' +
        '   </div>' +
        '  </div>' +
        ' </div>' +
        '</div>';

    }.bind(this));

    booksContent += '</div>';
    this.$booksContainer.html(booksContent);
  },

  showError: function() {
    this.$headerContainer.html('<h2>Author not found...</h2>');
    this.$authorContainer.html('');
    this.$booksContainer.html('');
  },
};