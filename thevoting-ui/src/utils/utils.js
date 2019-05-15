import moment from "moment";
import React from 'react';

export function dateFormatter(cell) {
  var date = cell;
  if (date) return moment.utc(date).format("DD/MM/YYYY");
  else return "";
}

export function booleanFormatter(cell) {
  if (cell) {
    return '<input type="checkbox" disabled checked />';
  } else {
    return '<input type="checkbox" disabled />';
  }
}


export function customCheckField (column, attr, editorClass){
  return (
    <input key={column} name={column.field} type="checkbox" className={ `${editorClass}` }  { ...attr }/>
  );
}