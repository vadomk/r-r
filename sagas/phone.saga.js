'use strict'
import { put, takeLatest, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import { phoneConstants } from '../constants';
import { phoneService } from '../services';
import { phoneActions } from '../actions';

function* getCurrentUserPhones(data) {
  try {
    const currentUserPhones = yield call(phoneService.getCurrentUserPhones);
    yield put(phoneActions.getCurrentUserPhones.success(currentUserPhones));
  } catch (error) {
    yield call(toastr.error, error.message);
    yield put(phoneActions.getCurrentUserPhones.failure(error));
  }
}

function* sendConfirmationCode(data) {
  try {
    const result = yield call(phoneService.sendConfirmationCode, data.phoneNumber, data.countryCallingCode);
    yield put(phoneActions.sendConfirmationCode.success(result));
    yield put(phoneActions.getCurrentUserPhones.request());
  } catch (error) {
    yield call(toastr.error, error.message);
    yield put(phoneActions.sendConfirmationCode.failure(error));
  }
}

function* checkConfirmationCode(data) {
  try {
    const result = yield call(
      phoneService.checkConfirmationCode,
      data.phoneNumber,
      data.countryCallingCode,
      data.confirmationCode
    );
    yield put(phoneActions.checkConfirmationCode.success(result));
    if (result.isConfirmed === true) {
      yield put(phoneActions.getCurrentUserPhones.request());
    }
  } catch (error) {
    yield call(toastr.error, error.message);
    yield put(phoneActions.sendConfirmationCode.failure(error));
  }
}

export function* phoneSaga() {
  yield takeLatest(phoneConstants.GET_CURRENT_USER_PHONES_REQUEST, getCurrentUserPhones);
  yield takeLatest(phoneConstants.SEND_CONFIRMATION_CODE_REQUEST, sendConfirmationCode);
  yield takeLatest(phoneConstants.CHECK_CONFIRMATION_CODE_REQUEST, checkConfirmationCode);
}
