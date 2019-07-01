var BreadcrumbsView = function(breadcrumbsModel) {
  this.breadcrumbsModel = breadcrumbsModel;

  this.init();
};

BreadcrumbsView.prototype = {
  init: function () {
    // create children
    this.$breadcrumbsContainer = $('#breadcrumbs-container');

    //setup handlers
    this.addBreadcrumbHandler = this.buildBreadcrumbs.bind(this);

    //enable
    this.breadcrumbsModel.addBreadcrumbEvent.attach(this.addBreadcrumbHandler);

  },

  buildBreadcrumbs: function() {
    var breadcrumbs = this.breadcrumbsModel.getBreadcrumbs();
    console.log(breadcrumbs);
    var breadcrumbsContent = '';

    for (var i = 0; i < breadcrumbs.length; i++) {
      var breadcrumb = breadcrumbs[i];
      breadcrumbsContent += '' +
        '<li class="breadcrumb-item ' + (breadcrumb.active ? 'active' : '') + '">' +
        '  <a href="' + breadcrumb.link + '" class="' + (breadcrumb.active ? 'text-reset' : '') + '">' +
        '    <span>' + breadcrumb.name + '</span>' +
        '  </a>' +
        '</li>';
    }

    this.$breadcrumbsContainer.html(breadcrumbsContent);
  },
};