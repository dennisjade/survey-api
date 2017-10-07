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

module.exports = {
  surveySubmitted:surveySubmitted
};