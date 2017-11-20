'use strict';

var Promise = require('bluebird');
var utils = require('../helpers/utils');
var model = require('./schema');

function createApproveRejectQ(criteria) {
  let q = {};
  if (criteria && criteria.selectedSurvey) {
    q = {
      _id: {
        $in: criteria.selectedSurvey
      }
    };
  }
  return q;
}

function approveReject(criteria) {
  return Promise
    .try(() => {
      let q = createApproveRejectQ(criteria);
      let s = {$set: {status: criteria.status}};
      return model.survey.update(q, s, {multi: true})
        .then(doc => {
          return doc;
        })
    })
}

function getSelected(criteria) {
  return Promise
    .try(() => {
      let q = createApproveRejectQ(criteria);
      return model.survey.find(q)
        .then(doc => {
          return doc;
        })
    })
}


module.exports = {
  approveReject: approveReject,
  getSelected: getSelected
};