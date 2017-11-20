'use strict';

var Promise = require('bluebird');
var utils = require('../helpers/utils');
var model = require('../models/schema');

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

function composeSurveyQuestionQuery(params) {
  let q = {};
  if (params.startSubsDate) {
    q  = {
      syncDate: {
        $gte: params.startSubsDate,
        $lte: params.endSubsDate
      }
    }
  } else if (params.startRespDate) {
    q = {
      responseDate: {
        $gte: params.startRespDate,
        $lte: params.endSubsDate
      }
    }
  } else if (params.username) {
   q  = {
     name: { $regex : new RegExp(params.username, "i") }
   }
 }

 q.docType = params.docType;
 return q;
}

function countTotalSurvey(q) {
  return Promise
    .try(() => {
      return model.survey.count(q)
        .then(doc => {
          return doc;
        })
  })
}

function getSurveyQuestions(criteria) {
  return Promise
    .try(() => {
      let q = composeSurveyQuestionQuery(criteria);
      return model.survey.find(q)
        .limit(criteria.limit)
        .skip((criteria.page-1) * 10)
        .then(doc => {
          return countTotalSurvey(q)
            .then(total => {
              return {
                doc: doc,
                total: total,
                currentPage: criteria.page
              }
            })

        })
        .catch(() => {
          throw err;
        })
    })
}

module.exports = {
  getTotalSurveyBySubmittedDate: getTotalSurveyBySubmittedDate,
  getTotalResponsePerQuestion: getTotalResponsePerQuestion,
  getSurveyQuestions: getSurveyQuestions
};