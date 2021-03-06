const ActionTypes = require('./TableActionTypes');
const cf = require('cf-pony');

function flashRowOn(tableName, rowId, rowType) {
  return {
    type: ActionTypes.CF_BUILDER_TABLE_FLASH_ROW_ON,
    tableName: tableName,
    rowId: rowId,
    rowType: rowType
  };
}

function flashRowOff(tableName, rowId) {
  return {
    type: ActionTypes.CF_BUILDER_TABLE_FLASH_ROW_OFF,
    tableName: tableName,
    rowId: rowId
  };
}

exports.flashRow = function(tableName, rowId, rowType) {
  return dispatch => {
    dispatch(flashRowOn(tableName, rowId, rowType));

    cf.requestAnimationFrame(() => {
      cf.requestAnimationFrame(() => {
        dispatch(flashRowOff(tableName, rowId));
      });
    });
  };
};
