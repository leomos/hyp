var EventView = function(eventModel, breadcrumbsModel) {
  this.eventModel = eventModel;
  this.eventId = null;
  this.breadcrumbsModel = breadcrumbsModel;

  this.init();
};

EventView.prototype = {
  init: function () {
    // create children
    this.$headerContainer = $('#header-container');
    this.$eventContainer = $('#event-container');
    this.$bookContainer = $('#book-container');

    //setup handlers
    this.fetchBookHandler = this.buildBookDetails.bind(this);
    this.fetchEventHandler = this.buildEventDetails.bind(this);

    //enable
    this.eventModel.fetchEventEvent.attach(this.fetchEventHandler);
    this.eventModel.fetchBookEvent.attach(this.fetchBookHandler);

    this.eventId = getUrlParameter('id');
    if(!this.eventId || !parseInt(this.eventId) ){
      this.showError();
      return;
    }
    this.eventModel.fetchEvent(parseInt(this.eventId));
  },

  buildEventDetails: function() {
    if(this.eventModel.getError() !== null) {
      this.showError();
      return;
    }

    var event = this.eventModel.getEvent();

    if(this.breadcrumbsModel) {
      this.breadcrumbsModel.addBreadcrumb(event.name, '/pages/event.html?id='+event.id, true);
    }

    this.$headerContainer.html('<h2>' + event.name + '</h2>');
    var eventDate = new Date(event.date);
    var eventContent = '' +
      '<div class="row">\n' +
      '    <div class="col text-center col-auto" style="max-width: 50%;"><img class="img-fluid" src="/assets/img/' + event.picture + '" /></div>\n' +
      '    <div class="col col-lg-6 col-12">\n' +
      '        <div class="d-block d-sm-none mb-3"></div>' +
      '        <h5><span><i class="fa fa-map-marker pr-1"></i></span><span class="text-secondary">' + event.location + '</span></h5>\n' +
      '        <h5><span><i class="fa fa-calendar pr-1"></i></span><span class="text-secondary">' + eventDate.toGMTString() + '</span></h5><a' +
    ' href="#">View on map <i class="fa fa-arrow-right"></i></a>\n' +
      '        <p class="pt-2">' + event.description + '</p>\n' +
      '    </div>\n' +
      '</div>';

    this.$eventContainer.html(eventContent);

  },

  buildBookDetails: function() {
    if(this.eventModel.getError() !== null) {
      this.showError();
      return;
    }

    var book = this.eventModel.getBook();
    var bookContent = '' +
      '<div class="row">\n' +
      '    <div class="col">\n' +
      '        <h3>Book of the event</h3>\n' +
      '    </div>\n' +
      '</div>\n' +
      '<div class="row">\n' +
      '    <div class="col text-center col-auto" style="max-width: 50%;"><img class="img-fluid" src="/assets/img/' + book.picture + '" /></div>\n' +
      '    <div class="col col-lg-6 col-12">\n' +
      '        <div class="d-block d-sm-none mb-3"></div>' +
      '        <h4>' + book.title +  '</h4>\n' +
      '        <p>' + book.abstract + '</p>\n' +
      '        <a href=/pages/book.html?id=' + book.id + '>Go to book page <i class="fa fa-arrow-right"></i></a>' +
      '    </div>\n' +
      '</div>';
    this.$bookContainer.html(bookContent);
  },

  showError: function() {
    this.$headerContainer.html('<h2>Event not found...</h2>');
    this.$eventContainer.html('');
    this.$bookContainer.html('');
  },
};