'use strict';

var surveyModel = require('../models/survey');

function surveySubmitted(req, res) {
  let startDate = req.swagger.params.dateStart.value;
  let endDate = req.swagger.params.dateEnd.value;
  let docType = req.swagger.params.docType.value;
  let ret = {
    status: 200,
    message: 'Success',
    data: {}
  };
  surveyModel
    .getTotalSurveyBySubmittedDate(startDate, endDate, docType)
    .then((doc) => {
      ret.data = doc;
      res.json(ret);
    })
    .catch((err) => {
      ret.status = 500;
      ret.message = 'Error';
      ret.data = err;
      res.status(ret.status).json(ret);
    });
}

function surveyQuestion(req, res) {
  let startDate = req.swagger.params.dateStart.value;
  let endDate = req.swagger.params.dateEnd.value;
  let docType = req.swagger.params.docType.value || '';
  let question = req.swagger.params.question.value;
  let ret = {
    status: 200,
    message: 'Success',
    data: {}
  };
  surveyModel
    .getTotalResponsePerQuestion(startDate, endDate, docType, question)
    .then(doc => {
      ret.data = doc;
      res.json(ret);
    })
    .catch((err) => {
      ret.status = 500;
      ret.message = 'Error';
      ret.data = err;
      res.status(ret.status).json(ret);
    });

}

function surveyResponse(req, res) {
  let criteria = {
    startSubsDate: req.swagger.params.subsDTStart.value,
    endSubsDate: req.swagger.params.subsDTEnd.value,
    startRespDate: req.swagger.params.respDTStart.value,
    endRespDate: req.swagger.params.respDTEnd.value,
    username: req.swagger.params.username.value,
    docType: req.swagger.params.docType.value || 'postEvent',
    page: req.swagger.params.page.value || 1,
    limit: req.swagger.params.limit? req.swagger.params.limit.value : 10
  };
  let ret = {
    status: 200,
    message: 'Success',
    data: {}
  };
  surveyModel
    .getSurveyQuestions(criteria)
    .then(doc => {
      ret.data = doc;
      res.json(ret);
    });
}


module.exports = {
  surveySubmitted: surveySubmitted,
  surveyQuestion: surveyQuestion,
  surveyResponse: surveyResponse
};