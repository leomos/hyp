var CartView = function(cartModel) {
  this.cartModel = cartModel;

  this.changeBookQuantityEvent = new Event();
  this.deleteBookEvent = new Event();
  this.deleteAllBooksEvent = new Event();

  this.init();
};

CartView.prototype = {
  init: function () {
    // create children
    this.$cartContainer = $('#cart-container');
    this.$summaryContainer = $('#summary-container');

    //setup handlers
    this.fetchCartHandler = this.buildBooksList.bind(this);

    //enable
    this.cartModel.fetchCartEvent.attach(this.fetchCartHandler);

  },

  buildBooksList: function() {
    var bookQuantities = this.cartModel.getBookQuantities();
    var books = this.cartModel.getBooks();

    this.$cartContainer.html('');
    if( (books.length < 1 && books) || (bookQuantities.length < 1 && bookQuantities)) {
      this.$cartContainer.html('' +
        '<h2>Your cart</h2>' +
        '<h5>There are no books in your cart...</h5>');

      this.$summaryContainer.html('' +
        '<div class="card">\n' +
        '    <div class="card-body">\n' +
        '        <h4 class="card-title">Total price</h4>\n' +
        '        <button class="btn btn-primary w-100" type="button" id="button-checkout">Continue to checkout</button>' +
        '    </div>\n' +
        '</div>');
      return;
    }

    var cartContent = '<h2>Your cart</h2>';

    books = books.map(function(book){
      book.quantity = bookQuantities.find(function(bookQuantity) {
        return bookQuantity.book_id === book.id;
      }).quantity;
      return book;
    });

    var createSelect = function(bookId, quantity) {
      var selectContent = '<select class="form-control d-inline w-50" id="select-quantity-' + bookId + '">';

      for (var i = 1; i <= 10; i++) {
        selectContent += '<option ' + (i===quantity ? 'selected' : '') + '>'  + i + '</option>';
      }

      selectContent += '</select>';
      return selectContent;
    };

    var totalPrice = 0;
    books.forEach(function(book){
      var bookTotalPrice = (parseInt(book.price)*book.quantity/100).toFixed(2);
      cartContent += '' +
        '<div class="row mb-4">' +
        '<div class="col col-lg-7 col-xl-7">' +
        ' <div class="card h-100">' +
        '  <div class="row no-gutters h-100">' +
        '   <div class="col-4 h-100">' +
        '    <a href="/pages/book.html?id=' + book.id + '" class="text-decoration-none text-reset"><img' +
        ' class="card-img" src="/assets/img/'+ book.picture + '" style="max-height: 100%;"/></a>' +
        '   </div>' +
        '   <div class="col-8 d-flex flex-column h-100">' +
        '    <div class="card-body h-100">' +
        '     <h4 class="card-title"><a href="/pages/book.html?id=' + book.id + '" class="text-decoration-none text-reset">' + book.title + '</a></h4>' +
        '     <h5 class="d-inline text-secondary">Quantity:</h5>' + createSelect(book.id, book.quantity) +
        '     <div class="mt-3" id="total-container-' + book.id + '">' +
        '       <h5 class="d-inline text-secondary">Total:  </h5>' +
        '       <h5 class="d-inline"><strong>' + bookTotalPrice + '€</strong></h5>' +
        '     </div>' +
        '    </div>' +
        '    <div class="card-footer bg-transparent" id="card-footer-' + book.id + '">\n' +
        '     <button type="button" class="btn btn-primary" id="button-delete-' + book.id + '">Delete</button>' +
        '    </div>' +
        '   </div>' +
        '  </div>' +
        ' </div>' +
        '</div>' +
        '</div>';
      totalPrice += parseFloat(bookTotalPrice);
    }.bind(this));

    this.$cartContainer.html(cartContent);

    books.forEach(function(book){
      var me = this;
      $('#select-quantity-'+book.id).on('change', function(){
        $('#total-container-'+book.id)
          .html('<div class="spinner-grow" role="status">\n' +
          '  <span class="sr-only">Loading...</span>\n' +
          '</div>');
        me.changeBookQuantityEvent.notify({
          bookId: book.id,
          quantity: this.value,
        });
      });

      $('#button-delete-'+book.id).click(function(){
        $('#card-footer-'+book.id)
          .html('<div class="spinner-grow" role="status">\n' +
            '  <span class="sr-only">Loading...</span>\n' +
            '</div>');
        me.deleteBookEvent.notify({
          bookId: book.id,
        })
      })
    }.bind(this));

    console.log(totalPrice);
    this.$summaryContainer.html('' +
      '<div class="card">\n' +
      '    <div class="card-body">\n' +
      '        <h4 class="card-title">Total price</h4>\n' +
      '        <h5><strong>' + totalPrice.toFixed(2) + '€</strong></h5>' +
      '        <button class="btn btn-primary w-100" type="button" id="button-checkout">Continue to checkout</button>' +
      '    </div>\n' +
      '</div>');
    $('#button-checkout').on('click', function (event) {
      this.deleteAllBooksEvent.notify();
    }.bind(this))
  },

};