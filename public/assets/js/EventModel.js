var EventModel = function() {
  this.event = {};
  this.book = {};
  this.error = null;
  this.fetchBookEvent = new Event(this);
  this.fetchEventEvent = new Event(this);
};

EventModel.prototype = {

  getEvent: function() {
    return this.event;
  },

  getBook: function() {
    return this.book;
  },

  getError: function() {
    return this.error;
  },


  fetchEvent: function (id) {
    $.when($.get('/events/'+id))
      .done(function (eventArguments) {
        this.event = eventArguments;

        $.get('/books/'+this.event.book_id)
          .done(function(book) {
            this.book = book;
            this.fetchBookEvent.notify();
          }.bind(this));

        this.fetchEventEvent.notify();
      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        this.event = {};
        this.book = {};
        this.error = errorThrown;
        this.fetchEventEvent.notify();
      }.bind(this));
  }
};