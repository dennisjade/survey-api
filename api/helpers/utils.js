'use strict';
var _ = require('underscore');

function formatForGraph(newDoc) {
  let tmp = [];
  for (var property in newDoc){
    if (newDoc.hasOwnProperty(property)) {
      tmp.push({
        label: property,
        values: newDoc[property]
      })
    }
  };

  let sortedData = _.sortBy(tmp, 'label');
  return {
    xLabel: _.pluck(sortedData, 'label'),
    values: _.pluck(sortedData, 'values')
  };
}

function groupUniqueAgentsByDate(doc){
  let newDoc = {};
  doc.forEach((item) => {
    if (!newDoc[item._id.syncDate]){
      newDoc[item._id.syncDate] = 0;
    }
    newDoc[item._id.syncDate] += 1;
  });

  return formatForGraph(newDoc);
}

function groupByDate(doc) {
  let newDoc = {};
  doc.forEach((item) => {
    if (!newDoc[item._id.syncDate]){
      newDoc[item._id] = 0;
    }
    newDoc[item._id] = item.count;
  });

  return formatForGraph(newDoc);
}

function groupByQuestion(doc) {
  let valuesPre = [];
  let valuesPost = [];

  doc.forEach((item) => {
    if (!item._id.q) {
      return;
    }
    if (item._id.docType === 'preEvent'){
      valuesPre.push({
        values: [item.count],
        text: item._id.q,
        fontSize: 9
      });
    } else {
      valuesPost.push({
        values: [item.count],
        text: item._id.q,
        fontSize: 9
      });
    }

  });

  return {
    valuesPre: valuesPre,
    valuesPost: valuesPost
  };
}
module.exports = {
  groupUniqueAgentsByDate: groupUniqueAgentsByDate,
  groupByDate: groupByDate,
  groupByQuestion: groupByQuestion
}