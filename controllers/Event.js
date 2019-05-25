'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getAllEvents = function getAllEvents (req, res, next) {
  var month = req.swagger.params['month'].value;
  Event.getAllEvents(month)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEvent = function getEvent (req, res, next) {
  var id = req.swagger.params['id'].value;
  Event.getEvent(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
