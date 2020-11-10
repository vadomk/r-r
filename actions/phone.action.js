'use strict';

import { phoneConstants as constants } from '../constants';

const getCurrentUserPhones = {
  request: () => ({ type: constants.GET_CURRENT_USER_PHONES_REQUEST }),
  success: phones => ({ type: constants.GET_CURRENT_USER_PHONES_SUCCESS, phones }),
  failure: error => ({ type: constants.GET_CURRENT_USER_PHONES_FAILURE, error }),
};

const sendConfirmationCode = {
  request: (phoneNumber, countryCallingCode) => (
    {
      type: constants.SEND_CONFIRMATION_CODE_REQUEST,
      phoneNumber,
      countryCallingCode
    }),
  success: result => ({ type: constants.SEND_CONFIRMATION_CODE_SUCCESS, result }),
  failure: error => ({ type: constants.SEND_CONFIRMATION_CODE_FAILURE, error }),
};

const checkConfirmationCode = {
  request: (phoneNumber, countryCallingCode, confirmationCode) => (
    {
      type: constants.CHECK_CONFIRMATION_CODE_REQUEST,
      phoneNumber,
      countryCallingCode,
      confirmationCode,
    }),
  success: result => ({ type: constants.CHECK_CONFIRMATION_CODE_SUCCESS, result }),
  failure: error => ({ type: constants.CHECK_CONFIRMATION_CODE_FAILURE, error }),
};

const resetConfirmationFlags = () => ({ type: constants.RESET_CONFIRMATION_FLAGS });

export const phoneActions = {
  getCurrentUserPhones,
  sendConfirmationCode,
  resetConfirmationFlags,
  checkConfirmationCode,
};
