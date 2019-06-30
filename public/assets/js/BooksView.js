var BooksView = function(booksModel, userModel, bookFilterModel) {
  this.booksModel = booksModel;
  this.userModel = userModel;
  this.bookFilterModel = bookFilterModel;


  this.init();
};

BooksView.prototype = {
  init: function () {
    // create children
    this.$container = $('#books-container');

    // setup handlers
    this.fetchAllBooksHandler = this.buildCardsList.bind(this);
    this.getDetailsHandler = this.buildCardsList.bind(this);
    this.logoutHandler = this.buildCardsList.bind(this);
    this.modifyGenresFilterHandler = this.buildCardsList.bind(this);
    this.modifyThemesFilterHandler = this.buildCardsList.bind(this);

    // enable
    this.booksModel.fetchAllBooksEvent.attach(this.fetchAllBooksHandler);
    this.userModel.getDetailsEvent.attach(this.getDetailsHandler);
    this.userModel.logoutEvent.attach(this.logoutHandler);
    if(this.bookFilterModel) {
      this.bookFilterModel.modifyGenresFilterEvent.attach(this.modifyGenresFilterHandler);
      this.bookFilterModel.modifyThemesFilterEvent.attach(this.modifyThemesFilterHandler);
    }
  },

  buildCardsList: function () {
    var books = this.booksModel.getBooks();
    var user = this.userModel.getUser();

    if(this.bookFilterModel) {
      books = this.bookFilterModel.filterBooks(books);
      console.log(books);
    }

    this.$container.html('');
    if(books.length === 0) {
      this.$container.html('<div class="col">\n' +
        '    <h5 style="margin-top: 1%;margin-bottom: 1%;">No book found matching your criteria...</h5>\n' +
        '</div>');
    }
    books.forEach(function(book){
      var newBookCard = '' +
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
        '     <h6 class="text-muted card-subtitle mb-2">' + book.authors.join(', ') + '</h6>' +
        '     <p class="card-text text-break">' + book.abstract.truncateWords(20) + '...</p>' +
        '    </div>' +
        '    <div class="card-footer bg-transparent">' + this.createAddToCartLink(user, book.id) +
        //TODO: event's link
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
      //TODO: cart logic
      return '<a class="card-link" href="#">Add to cart</a>';
    } else {
      return '<span class="mr-4 text-secondary">Add to cart</span>'
    }
  },
};