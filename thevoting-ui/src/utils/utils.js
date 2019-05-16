import moment from "moment";
import React from 'react';
import CheckBoxField from "./checkBox.js";
import DateField from "./date.js";


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
    <CheckBoxField key={column} name={column.field} className={ `${editorClass}` }  { ...attr }/>
  );
}

export function customDateField (column, attr, editorClass){
  return (
    <DateField key={column} name={column.field} className={ `form-control ${editorClass}` }  { ...attr }/>
  );
}

