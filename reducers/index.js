'use strict';
//import npm modules
import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
//import local modules
import { phones } from './phone.reducer';

const rootReducer = combineReducers({
  toastr,
  phones,
});

export default rootReducer;
