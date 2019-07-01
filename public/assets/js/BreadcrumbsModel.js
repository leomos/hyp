var BreadcrumbsModel = function() {
  this.breadcrumbs = [];

  this.addBreadcrumbEvent = new Event(this);
};

BreadcrumbsModel.prototype = {

  getBreadcrumbs: function() {
    return this.breadcrumbs;
  },

  addBreadcrumb: function (name, link, active) {
    this.breadcrumbs.push({
      name: name,
      link: link,
      active: !!active,
    });
    this.addBreadcrumbEvent.notify();
  }
};