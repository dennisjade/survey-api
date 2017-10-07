'use strict';
var _ = require('underscore');

function groupUniqueAgentsByDate(doc){
  let newDoc = {};
  doc.forEach((item) => {
    if (!newDoc[item._id.syncDate]){
      newDoc[item._id.syncDate] = 0;
    }
    newDoc[item._id.syncDate] += 1;
  });
  return newDoc;
}

function groupByDate(doc) {
  let newDoc = {};
  doc.forEach((item) => {
    if (!newDoc[item._id.syncDate]){
      newDoc[item._id] = 0;
    }
    newDoc[item._id] = item.count;
  });
  return newDoc;
}

module.exports = {
  groupUniqueAgentsByDate: groupUniqueAgentsByDate,
  groupByDate: groupByDate
}