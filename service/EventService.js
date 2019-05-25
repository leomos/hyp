'use strict';

var models = require('../models');
var utils = require('../utils/writer.js');
const Op = require('sequelize').Op;

/**
 * Returns an array with all the events.
 *
 * month Integer The month of the events (optional)
 * returns List
 **/
exports.getAllEvents = function(month) {
  return new Promise(async function(resolve, reject) {
    if(parseInt(month) >= 0 || month === undefined) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      await models.Event.findAll({
        where: month !== undefined ? {
          date: {
            [Op.lte]: new Date(Date.UTC(currentYear, month+1)),
            [Op.gte]: new Date(Date.UTC(currentYear, month, 1)),
          }
        } : null,
      })
        .then(events => {
          resolve(events);
        })
        .catch(err => {
          console.log(err);
          reject(utils.respondWithCode(500));
        })
    } else {
      reject(utils.respondWithCode(422, models.Error(781, 'Month is not valid')));
    }
  });
}


/**
 * Returns the details of a specific event.
 *
 * id Integer The event ID
 * returns Event
 **/
exports.getEvent = function(id) {
  return new Promise(async function(resolve, reject) {
    if(parseInt(id)) {
      await models.Event.findByPk(id)
        .then(event => {
          if(event) {
            resolve(event);
          } else {
            reject(utils.respondWithCode(404, models.Error(701, 'Event not found')));
          }
        })
        .catch(err => {
          reject(utils.respondWithCode(500));
        })
    } else {
      reject(utils.respondWithCode(400, models.Error(702, 'Id is not a valid number')));
    }
  });
}

