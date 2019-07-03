var CartController = function (model, view) {
  this.model = model;
  this.view = view;

  this.init();
};

CartController.prototype = {

  init: function() {
    if(this.view.changeBookQuantityEvent) {
      this.view.changeBookQuantityEvent.attach(this.changeBookQuantity.bind(this));
    }
    if(this.view.putBookEvent) {
      this.view.putBookEvent.attach(this.putBook.bind(this));
    }
    if(this.view.deleteBookEvent) {
      this.view.deleteBookEvent.attach(this.deleteBook.bind(this));
    }
  },

  changeBookQuantity: function (sender, args) {
    this.model.changeBookQuantity(args.bookId, args.quantity);
  },

  putBook: function(sender, args) {
    this.model.putBook(args.bookId, args.quantity);
  },

  deleteBook: function(sender, args) {
    this.model.deleteBook(args.bookId);
  },
};