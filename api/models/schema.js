'use strict';
var DB = require('../helpers/db');
var Schema = DB.mongoose.Schema;
var surveySchema = new Schema(
  {
    auditor: { type: String, required: true},
    responseDate: { type: String, required: true }
  },
  {
    strict: false
  });
var survey = DB.mongoose.model('survey', surveySchema);

module.exports = {
  survey: survey
};