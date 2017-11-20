'use strict';
var surveyActionModel = require('../models/survey_action');

function setStatus(req, res) {
  let criteria = {
    selectedSurvey: req.swagger.params.selectedSurvey.value,
    status: req.swagger.params.status.value
  };
  let ret = {
    status: 200,
    message: 'Success',
    data: {}
  };
  surveyActionModel
    .approveReject(criteria)
    .then(doc => {
      ret.data = doc;
      res.json(ret)
    })
}

module.exports = {
  setStatus: setStatus
};