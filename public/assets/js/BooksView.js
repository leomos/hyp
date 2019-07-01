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
             (book.hasEvents ? '<a class="card-link" href="/pages/book.html?id=' + book.id + '#events-container">Events</a>' : '') + '</div>' +
        '   </div>' +
        '  </div>' +
        ' </div>' +
        '</div>';
      this.$container.append(newBookCard);
    }.bind(this));

    this.addRegistrationNeededModal();
  },

  createAddToCartLink: function(user, bookId) {
    if(user) {
      //TODO: cart logic
      return '<a class="card-link" href="#">Add to cart</a>';
    } else {
      return '' +
        '<button type="button" class="btn btn-link mr-4 p-0 card-link" data-toggle="modal"' +
        ' data-target="#registrationNeededModal">\n' +
        '  Add to cart\n' +
        '</button>'
    }
  },

  addRegistrationNeededModal: function () {
    this.$container.append('' +
      '<div role="dialog" tabindex="-1" class="modal fade" id="registrationNeededModal">\n' +
      '    <div class="modal-dialog modal-dialog-centered" role="document">\n' +
      '        <div class="modal-content">\n' +
      '            <div class="modal-header border-0 pb-1"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>\n' +
      '            <div class="modal-body pt-0 pl-4 pr-4 border-0">\n' +
      '                <h4>We are happy that you found an interesting book, please login to add it to cart.</h4>\n' +
      '                <p>If you are a new user, just register a new account...and welcome to ebookit!</p>\n' +
      '            </div>\n' +
      '            <div class="modal-footer border-0 pt-0">' +
      '                <a href="/pages/login.html" type="button" class="btn btn-primary w-100 text-light"' +
      ' type="button">Login</a>' +
      '                <a href="/pages/registration.html" type="button" class="btn btn-primary w-100 text-light"' +
      ' type="button">Register</a>' +
      '            </div>\n' +
      '        </div>\n' +
      '    </div>\n' +
      '</div>');
  }
};