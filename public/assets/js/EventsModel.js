var EventsModel = function() {
  this.events = [];
  this.error = null;
  this.fetchAllEventsEvent = new Event(this);
};

EventsModel.prototype = {

  getEvents: function() {
    return this.events;
  },

  fetchAllEvents: function (month) {
    $.when($.get('/events', {month: month}))
      .done(function(eventsArguments) {
        this.events = eventsArguments;
        console.log(this.events);
        this.error = null;
        this.fetchAllEventsEvent.notify();
      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        this.books = [];
        this.error = errorThrown;
        this.fetchAllEventsEvent.notify();
      }.bind(this));
  },
};