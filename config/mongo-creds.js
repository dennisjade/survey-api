'use strict';

// Notes: Credentials should not be saved and checkin in the repo
// A manifest file should be created only during deployment as part of the CI workflow.
// Some PAAS also allows ENVIRONMENT savings
var env = require('../package.json').enviroment || 'production';
var dbCreds = {
  'production': {
    dbname: 'nextbillion',
    user: 'next',
    pwd: 'billion',
    url: 'ds113445.mlab.com',
    port: '13445'
  },
  'developmnt': {
    dbname: 'nextbillion',
    user: 'next',
    pwd: 'billion',
    url: 'ds113445.mlab.com',
    port: '13445'
  }
};

module.exports = dbCreds[env];