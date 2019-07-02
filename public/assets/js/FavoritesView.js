var FavoritesView = function(booksModel, userModel) {
  this.booksModel = booksModel;
  this.userModel = userModel;

  this.init();
};

FavoritesView.prototype = {
  init: function () {
    // create children
    this.$container = $('#favorites-container');

    // setup handlers
    this.fetchAllBooksHandler = this.buildCardsList.bind(this);
    this.getDetailsHandler = this.buildCardsList.bind(this);
    this.logoutHandler = this.buildCardsList.bind(this);

    // enable
    this.booksModel.fetchAllBooksEvent.attach(this.fetchAllBooksHandler);
    this.userModel.getDetailsEvent.attach(this.getDetailsHandler);
    this.userModel.logoutEvent.attach(this.logoutHandler);
  },

  buildCardsList: function () {
    var books = this.booksModel.getBooks().filter(function (book) {
      return book.is_favorite;
    });
    var user = this.userModel.getUser();

    this.$container.html('');
    books.forEach(function(book){
      var newBookCard = '' +
        '<div class="col col-12 col-sm-12 col-md-6 col-lg-4 mb-3">' +
        ' <div class="card h-100">' +
        '  <div class="row no-gutters h-100">' +
        '   <div class="col-4 h-100"><img class="card-img" src="/assets/img/'+ book.picture + '" style="max-height:' +
        ' 100%;"/></div>' +
        '   <div class="col-8 d-flex flex-column h-100">' +
        '    <div class="card-body h-100">' +
        '     <h4 class="card-title">' + book.title + '</h4>' +
        '     <h6 class="text-muted card-subtitle mb-2">' + book.authors.join(', ') + '</h6>' +
        '     <p class="card-text text-break">' + book.abstract.truncateWords(20) + '...</p>' +
        '    </div>' +
        '    <div class="card-footer bg-transparent">' + this.createAddToCartLink(user, book.id) +
        (book.hasEvents ? '<a class="card-link" href="#">Events</a>' : '') + '</div>' +
        '   </div>' +
        '  </div>' +
        ' </div>' +
        '</div>';
      this.$container.append(newBookCard);
    }.bind(this));
  },

  createAddToCartLink: function(user, bookId) {
    if(user) {
      return '<a class="card-link" href="#">Add to cart</a>';
    } else {
      return '<span class="mr-4 text-secondary">Add to cart</span>'
    }
  },
};