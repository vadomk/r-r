'use strict';
import parsePhoneNumber from 'libphonenumber-js'

import { phoneConstants as constants } from '../constants';

export function phones(state = {}, action) {
  switch (action.type) {
    case constants.GET_CURRENT_USER_PHONES_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case constants.GET_CURRENT_USER_PHONES_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUserPhones: action.phones,
        currentUserPhonesByCountry: { ...getCurrentUserPhonesByCountry(action.phones) },
      };
    case constants.GET_CURRENT_USER_PHONES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case constants.SEND_CONFIRMATION_CODE_REQUEST:
      return {
        ...state,
        wasConfirmationCodeSent: false,
      };
    case constants.SEND_CONFIRMATION_CODE_SUCCESS:
      return {
        ...state,
        wasConfirmationCodeSent: true,
      };
    case constants.SEND_CONFIRMATION_CODE_FAILURE:
      return {
        ...state,
        wasConfirmationCodeSent: false,
      };
    case constants.RESET_CONFIRMATION_FLAGS:
      return {
        ...state,
        wasConfirmationCodeSent: false,
        isPhoneConfirmed: false,
      };
    case constants.CHECK_CONFIRMATION_CODE_REQUEST:
      return {
        ...state,
        isPhoneConfirmed: false,
      };
    case constants.CHECK_CONFIRMATION_CODE_SUCCESS:
      return {
        ...state,
        isPhoneConfirmed: action.result.isConfirmed,
      };
    case constants.CHECK_CONFIRMATION_CODE_FAILURE:
      return {
        ...state,
        isPhoneConfirmed: false,
      };
    default:
      return state;
  }
}

const getCurrentUserPhonesByCountry = phones => {
  const userPhonesByCountry = [];
  phones.forEach(item => {
    const phoneNumber = parsePhoneNumber(item.phone, { defaultCallingCode: item.countryCallingCode });
    if (!phoneNumber || !phoneNumber.isValid()) {
      return;
    }
    if (!userPhonesByCountry[item.countryCallingCode]) {
      userPhonesByCountry[item.countryCallingCode] = [];
    }
    userPhonesByCountry[item.countryCallingCode].push(
      {
        value: phoneNumber.formatNational(),
        label: phoneNumber.formatNational(),
        isConfirmed: item.isConfirmed,
      }
    );
  });

  return userPhonesByCountry;
};
