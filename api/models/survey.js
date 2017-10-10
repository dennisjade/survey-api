'use strict';

var Promise = require('bluebird');
// var DB = require('../helpers/db');
var utils = require('../helpers/utils');
var model = require('../models/schema');
// var Schema = DB.mongoose.Schema;
//
// // create a schema
// var surveySchema = new Schema(
//   {
//     auditor: { type: String, required: true},
//     responseDate: { type: String, required: true }
//   },
//   {
//     strict: false
//   });
// var survey = DB.mongoose.model('survey', surveySchema);

function getTotalSurveyBySubmittedDate(startDate, endDate, docType) {
  return Promise
    .try(function(){
      var query = [
        {
          $match: {
            syncDate: {
              $gte: startDate,
              $lte: endDate
            },
            docType: docType
          }
        },
        {
          $group: {
            _id: "$syncDate",
            count: {
              $sum: 1
            }
          }
        }
      ];
      return model.survey
        .aggregate(query)
        .then(function (doc) {
          return utils.groupByDate(doc);
        })
        .catch(function(err) {
          throw err;
        })
    })
}

function getTotalResponsePerQuestion(startDate, endDate, docType, question){
  return Promise
    .try(() => {
      var query = [
        {
          $match: {
            responseDate: {
              $gte: startDate,
              $lte: endDate
            },
            docType: docType
          }
        },
        {
          $group: {
            _id: { docType: "$docType", q: "$"+question},
            count: {
              $sum: 1
            }
          }
        }
      ];
      if (!docType){
        delete query[0].$match.docType
      }
      return model.survey
        .aggregate(query)
        .then(function (doc) {
          return utils.groupByQuestion(doc);
        })
        .catch(function(err) {
          throw err;
        })
    })
}

module.exports = {
  getTotalSurveyBySubmittedDate: getTotalSurveyBySubmittedDate,
  getTotalResponsePerQuestion: getTotalResponsePerQuestion
};