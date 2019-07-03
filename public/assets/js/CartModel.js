var CartModel = function() {
  this.bookQuantities = [];
  this.books = [];
  this.error = null;

  this.fetchCartEvent = new Event(this);
};

CartModel.prototype = {

  getBookQuantities: function() {
    return this.bookQuantities;
  },

  getBooks: function() {
    return this.books;
  },


  putBook: function (bookId, quantity) {
    $.ajax({
      method: 'PUT',
      url: '/cart',
      data: JSON.stringify({
        book_id: bookId,
        quantity: quantity || 1,
      }),
      contentType : 'application/json',
      processData : false
    })
      .done(this.fetchCart.bind(this))
      .fail(function(jqXHR, textStatus, errorThrown) {
        this.error = errorThrown;
      }.bind(this));
  },

  changeBookQuantity: function (bookId, quantity) {
    $.ajax({
      method: 'PATCH',
      url: '/cart',
      data: JSON.stringify({
        book_id: bookId,
        quantity: quantity
      }),
      contentType : 'application/json',
      processData : false
    })
      .done(this.fetchCart.bind(this))
      .fail(function(jqXHR, textStatus, errorThrown) {
        this.error = errorThrown;
      }.bind(this));
  },

  decrementBookQuantity: function(bookId) {
    var actualBookQuantity = this.bookQuantities.find(function(bookQuantity) {
      return bookQuantity.book_id === bookId;
    });
    console.log(actualBookQuantity);
    if(actualBookQuantity) {
      this.changeBookQuantity(bookId, actualBookQuantity.quantity - 1);
    }
  },

  incrementBookQuantity: function(bookId) {
    var actualBookQuantity = this.bookQuantities.find(function(bookQuantity) {
      return bookQuantity.book_id === bookId;
    });
    console.log(actualBookQuantity);
    if(actualBookQuantity) {
      this.changeBookQuantity(bookId, actualBookQuantity.quantity + 1);
    }
  },

  deleteBook: function(bookId) {
    this.changeBookQuantity(bookId, 0);
  },

  deleteAllBooks: function() {
    $.ajax({
      method: 'DELETE',
      url: '/cart'
    })
      .done(this.fetchCart.bind(this))
      .fail(function(jqXHR, textStatus, errorThrown) {
        this.error = errorThrown;
      }.bind(this));
  },

  fetchCart: function() {
    $.get('/cart')
      .done(function(bookQuantities) {
        this.bookQuantities = bookQuantities.books_quantities;
        this.books = [];

        var booksRequestsPromises = this.bookQuantities.map(function(bookQuantity){
          return $.get('/books/'+bookQuantity.book_id);
        });
        $.when.apply(null, booksRequestsPromises)
          .done(function() {
            if(arguments.length === 3 && (typeof arguments[1])==="string") {
              this.books.push(arguments[0]);
            } else {
              for (var i = 0; i < arguments.length; i++) {
                this.books.push(arguments[i][0]);
              }
            }
            this.fetchCartEvent.notify();
          }.bind(this));

        this.error = null;
      }.bind(this))
      .fail(function(jqXHR, textStatus, errorThrown) {
        this.bookQuantities = [];
        this.error = errorThrown;
        this.fetchCartEvent.notify();
      }.bind(this));
  },

};