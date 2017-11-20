'use strict';

const Promise = require('bluebird');
const excel = require('exceljs');
const fse = require('fs-extra');
const surveyActionModel = require('./survey_action');
const surveyModel = require('./survey');
const baseDir = './tmp';

function populate(worksheet, doc) {
  return Promise
    .try(() => {
      fse.ensureDirSync(baseDir);
      worksheet.columns = [
        { header: 'Username', key: 'username', width: 15},
        { header: 'Submission Date', key: 'submissionDT', width: 20},
        { header: 'Response Date', key: 'responseDT', width: 20},
        { header: 'Cooking Benefits', key: 'benefits', width: 40},
        { header: 'Status', key: 'status', width: 12}
      ];
      worksheet.getRow(1).font = {size: 13, bold: true};

      for (let d in doc) {
        let _doc = doc[d]._doc;
        worksheet.addRow({
          username: _doc.name,
          submissionDT: _doc.syncDate,
          responseDT: _doc.responseDate,
          benefits: _doc.q_cleanCookingBenefits,
          status: _doc.status
        });
      };
      return worksheet;
  })
}

function selectedExcelFile(criteria) {
  return Promise
    .try(() => {
      const workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet('Survey Responses');
      let filename = new Date().getTime() +  '.xlsx';

      return surveyActionModel
        .getSelected(criteria)
        .then(doc => {
          return populate(worksheet, doc)
            .then(() => {
              return workbook.xlsx.writeFile(baseDir + '/' + filename)
                .then(function () {
                  return ({
                    filename: filename,
                    baseDir: baseDir
                  });
                })
                .catch(function (xlsErr) {
                  throw xlsErr
                });
            })
        })
    })
}

function allExcelFile(criteria) {
  return Promise
    .try(() => {
      const workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet('Survey Responses');
      let filename = new Date().getTime() +  '.xlsx';

      return surveyModel
        .getSurveyQuestions(criteria)
        .then(data => {
          return populate(worksheet, data.doc)
            .then(() => {
              return workbook.xlsx.writeFile(baseDir + '/' + filename)
                .then(function () {
                  return ({
                    filename: filename,
                    baseDir: baseDir
                  });
                })
                .catch(function (xlsErr) {
                  throw xlsErr
                });
            })
        })
    })

}
module.exports = {
  selectedExcelFile: selectedExcelFile,
  allExcelFile: allExcelFile
};