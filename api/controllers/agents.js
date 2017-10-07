'use strict';

var agentsModel = require('../models/agents');

function agentsSubmittedSurvey(req, res) {
  let startDate = req.swagger.params.dateStart.value;
  let endDate = req.swagger.params.dateEnd.value;
  let ret = {
    status: 200,
    message: 'Success',
    data: {}
  };
  agentsModel
    .getTotalAgentsBySubmittedDate(startDate, endDate)
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
  agentsSubmittedSurvey:agentsSubmittedSurvey
};