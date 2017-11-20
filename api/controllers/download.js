'use strict';

const downloadModel = require('../models/download');
const fse = require('fs-extra');

function downloadSelected(req, res) {
  let criteria = {
    selectedSurvey: req.swagger.params.selectedSurvey.value
  };

  downloadModel
    .selectedExcelFile(criteria)
    .then(doc => {
      res.download('tmp/' + doc.filename, function () {
        fse.remove('tmp/' + doc.filename);
      }, function (err) {
        res.header('content-type', 'application/json');
        res.send(err);
      });
    })
}

function downloadAll(req, res) {
  let criteria = {
    startSubsDate: req.swagger.params.subsDTStart.value,
    endSubsDate: req.swagger.params.subsDTEnd.value,
    startRespDate: req.swagger.params.respDTStart.value,
    endRespDate: req.swagger.params.respDTEnd.value,
    username: req.swagger.params.username.value,
    docType: req.swagger.params.docType.value || 'postEvent',
    page: req.swagger.params.page.value || 1,
    limit: 0
  };
  downloadModel
    .allExcelFile(criteria)
    .then(doc => {
      res.download('tmp/' + doc.filename, () => {
        fse.remove('tmp/' + doc.filename);
      }, (err) => {
        res.header('content-type', 'application/json');
        res.send(err);
      })
    })
}

module.exports = {
  downloadSelected: downloadSelected,
  downloadAll: downloadAll
};