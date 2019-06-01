var BooksView = function(model) {
  this.model = model;

  this.init();
};

BooksView.prototype = {
  init: function () {
    // create children
    this.$container = $('#books-container');

    // setup handlers

    // enable
    this.model.fetchAllBooksEvent.attach(this.buildCardsList.bind(this));
  },

  buildCardsList: function () {
    const books = this.model.getBooks();
    console.log(books);
    for(var book of books) {
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
        '    <div class="card-footer bg-transparent"><a class="card-link" href="#">Add to cart</a><a class="card-link" href="#">Events</a></div>' +
        '   </div>' +
        '  </div>' +
        ' </div>' +
        '</div>';
      this.$container.append(newBookCard);
    }
  },
};