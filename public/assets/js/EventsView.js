var EventsView = function(eventsModel) {
  this.eventsModel = eventsModel;

  this.init();
};

EventsView.prototype = {
  init: function () {
    // create children
    this.$container = $('#events-container');

    // setup handlers
    this.fetchAllEventsHandler = this.buildEventsList.bind(this);

    // enable
    this.eventsModel.fetchAllEventsEvent.attach(this.fetchAllEventsHandler);
  },

  buildEventsList: function () {
    var events = this.eventsModel.getEvents();

    this.$container.html('');
    if(events.length === 0) {
      this.$container.html('\n' +
        '    <h5 style="margin-top: 5%;margin-bottom: 2%;">No events this month...</h5>\n' +
        '');
      return;
    }
    var eventsContent = '' +
      '<div class="row">\n' +
      '    <div class="col">\n' +
      '        <div class="row mb-5">\n';

    events.forEach(function(event) {
      var eventDate = new Date(event.date);
      eventsContent += '' +
        '            <div class="col col-12 mb-3">\n' +
        '                <div class="row">\n' +
        '                    <div class="col col-12 col-lg-3"><a href="/pages/event.html?id=' + event.id + '"><img class="img-fluid" src="/assets/img/' + event.picture + '" /></a></div>\n' +
        '                    <div class="col">\n' +
        '                        <div class="d-block d-sm-none mb-3"></div>' +
        '                        <a class="text-decoration-none text-reset" href="/pages/event.html?id=' + event.id + '"><h4>' + event.name + '</h4></a>\n' +
        '                        <h6><span><i class="fa fa-map-marker mr-1"></i></span><span class="text-secondary">' + event.location + '</span></h6>\n' +
        '                        <h6><span><i class="fa fa-calendar mr-1"></i></span><span class="text-secondary">' + eventDate.toGMTString() + '</span></h6>\n' +
        '                        <p>' + event.description + '</p>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n';
    });

    eventsContent +=  '' +
      '        </div>\n' +
      '        <div class="row p-3"></div>\n' +
      '    </div>\n' +
      '</div>';

    this.$container.html(eventsContent);
  },

};