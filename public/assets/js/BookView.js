var BookView = function(bookModel, userModel) {
  this.bookModel = bookModel;
  this.userModel = userModel;
  this.bookId = null;

  this.init();
};

BookView.prototype = {
  init: function () {
    // create children
    this.$headerContainer = $('#header-container');
    this.$mainContainer = $('#main-container');
    this.$abstractContainer = $('#abstract-container');
    this.$eventsContainer = $('#events-container');
    this.$reviewsContainer = $('#reviews-container');

    //setup handlers
    this.fetchBookHandler = this.buildBookDetails.bind(this);
    this.buildBookReviewDetailsHandler = this.buildBookReviewDetails.bind(this);
    this.getDetailsHandler = this.toggleAddToCartButton.bind(this);
    this.fetchBookEventsHandler = this.buildEventsList.bind(this);
    this.fetchBookReviewsHandler = this.buildReviewsList.bind(this);

    //enable
    this.bookModel.fetchBookEvent.attach(this.fetchBookHandler);

    this.bookModel.fetchBookReviewsEvent.attach(this.buildBookReviewDetailsHandler);

    this.bookModel.fetchBookEventsEvent.attach(this.fetchBookEventsHandler);
    this.bookModel.fetchBookEvent.attach(this.fetchBookEventsHandler);

    this.bookModel.fetchBookReviewsEvent.attach(this.fetchBookReviewsHandler);
    this.bookModel.fetchBookEvent.attach(this.fetchBookReviewsHandler);

    this.userModel.getDetailsEvent.attach(this.getDetailsHandler);
    this.userModel.logoutEvent.attach(this.getDetailsHandler);

    this.bookId = getUrlParameter('id');
    if(!this.bookId) {
      this.$headerContainer.html('<h2 style="margin-top: 5%;margin-bottom: 2%;">Book not found...</h2>');
      return;
    }
    this.bookModel.fetchBook(parseInt(this.bookId));
  },

  buildBookDetails: function() {
    var book = this.bookModel.getBook();
    var authors = this.bookModel.getAuthors();
    var themes = this.bookModel.getThemes();
    var genres = this.bookModel.getGenres();

    this.$headerContainer.html('<h2 style="margin-top: 5%;margin-bottom: 2%;">' + book.title + '</h2>');

    var bookYear = (new Date(book.publication_date)).getFullYear();
    var bookAuthors = authors.map(function(author){
      //TODO: author's link
      return '<a href="#"><span style="text-decoration: underline;">' + author.first_name + ' ' + author.last_name + '</span></a>';
    });
    var bookPrice = (parseInt(book.price)/100).toFixed(2);
    var mainContent = '' +
      '    <div class="row">\n' +
      '        <div class="col text-center col-auto" id="book-cover-container"><img class="img-fluid pb-2" src="/assets/img/'+ book.picture + '" style="max-height: 300px;max-width: 300px;" /></div>\n' +
      '        <div class="col">\n' +
      '            <div class="row">\n' +
      '                <div class="col">\n' +
      '                    <h4 class="pb-2">' + book.title + ' - ' + bookYear + ' - ' + book.publishing_house +'</h4>\n' +
      '                    <h5 class="pb-2">by ' + bookAuthors + '</h5>\n' +
      '                    <div class="pb-2" id="book-review-details">\n' +
      '                    </div>\n' +
      '                    <h5 class="pb-2">' + book.format.capitalizeFirstLetter() + '</h5>\n' +
      '                    <h3 class="pb-2"><strong>' + bookPrice + '€</strong></h3>' +
      //TODO: cart logic
      '                    <button class="btn btn-primary" type="button" disabled="true" id="book-add-cart-button">Add to cart</button>' +
      '                </div>\n' +
      '            </div>\n' +
      '        </div>\n' +
      '    </div>';
    this.$mainContainer.html(mainContent);

    this.buildBookReviewDetails();
    this.toggleAddToCartButton();

    var abstractContent = '' +
      '    <p style="max-width: 700px;">' + book.abstract + '<br /></p>\n' +
      //TODO: interview
      //'    <p style="max-width: 700px;">Take a look at the <a href="#">author&#39;s interview</a><br /></p>\n' +
      '';
    this.$abstractContainer.html(abstractContent);
  },

  buildBookReviewDetails: function() {
    var reviews = this.bookModel.getReviews();
    if(reviews.length > 0) {
      var rating =
        reviews
          .map(function(review) {
            return review.rating;
          })
          .reduce(function(accumulator, currentValue){
            return accumulator+currentValue;
          }) / reviews.length;
      this.$bookReviewDetails = this.$mainContainer.find('#book-review-details');
      this.$bookReviewDetails.html('<h5 class="d-inline">' + rating + '/5</h5><a class="ml-1" href="#reviews-container">' + reviews.length + ' customer' +
        ' reviews</a>');
    }
  },

  toggleAddToCartButton: function() {
    this.$addToCartButton = this.$mainContainer.find('#book-add-cart-button');
    this.$addToCartButton.prop('disabled', !this.userModel.getUser());
  },

  buildEventsList: function() {
    var events = this.bookModel.getEvents();
    var book = this.bookModel.getBook();

    var eventsContent = '' +
      '<div class="row">\n' +
      '    <div class="col">\n' +
      '        <h4 id="events-heading">Events about &quot;' + book.title + '&quot;</h4>\n' +
      '        <div class="row mb-5">\n';
    if(events.length < 1) {
      eventsContent += '<div class="col col-12 col-lg-6 mb-3"><h5>No events found...</h5></div>';
    }
    events.forEach(function(event) {
      console.log(event);
      eventsContent += '' +
        '<div class="col col-12 col-lg-6 mb-3">\n' +
        '    <div class="row">\n' +
        '        <div class="col col-3"><img class="img-fluid" src="/assets/img/' + event.picture + '" /></div>\n' +
        '        <div class="col">\n' +
        '            <h4>' + event.name + '</h4>\n' +
        //TODO: event link
        '            <h4><a href="#"><span style="text-decoration: underline;">Go to event</span></a></h4>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>'
    });

    eventsContent += '' +
    '        </div>\n' +
    '        <div class="row p-3"></div>\n' +
    '    </div>\n' +
    '</div>';

    this.$eventsContainer.html(eventsContent);
  },

  buildReviewsList: function() {
    var reviews = this.bookModel.getReviews();

    var reviewsContent = '' +
      '<div class="row">\n' +
      '    <div class="col">\n' +
      '        <h4>Customer reviews</h4>';

    reviews.forEach(function(review) {
      var userFullName = review.User.first_name + ' ' + review.User.last_name;
      var reviewDate = new Date(review.date);
      reviewsContent += '' +
        '        <div class="row mb-5">\n' +
        '            <div class="col col-auto">\n' +
        '                <h3 class="font-weight-bold">' + review.rating + '/5</h3>\n' +
        '            </div>\n' +
        '            <div class="col">\n' +
        '                <h5>' + userFullName + '</h5>\n' +
        '                <h6 class="text-secondary">' + reviewDate.toLocaleDateString() + '</h6>\n' +
        '                <p>' + review.content + '</p>\n' +
        '            </div>\n' +
        '        </div>';
    });

    reviewsContent += '\n' +
      '    </div>\n' +
      '</div>';

    this.$reviewsContainer.html(reviewsContent);
  },

};