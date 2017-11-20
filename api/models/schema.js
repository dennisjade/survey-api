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

const userSchema = new Schema(
  {
    name: {type: String, required: true},
    location: {type: String, required: false},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  },
  {
    strict: false
  }
);
const user = DB.mongoose.model('user', userSchema);
module.exports = {
  survey: survey,
  user: user
};