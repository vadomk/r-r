'use strict';
import { apiGet, apiPost } from '../helpers';
import { applicationConfig as config } from '../config';

const getCurrentUserPhones = () => apiGet(`${config.apiBase}current-user-phones`);

const sendConfirmationCode = (phoneNumber, countryCallingCode) => {
  return apiPost(`${config.apiBase}send-confirmation-code`, { phoneNumber, countryCallingCode });
};

const checkConfirmationCode = (phoneNumber, countryCallingCode, confirmationCode) => {
  return apiPost(`${config.apiBase}check-confirmation-code`, { phoneNumber, countryCallingCode, confirmationCode });
};

export const phoneService = {
  getCurrentUserPhones,
  sendConfirmationCode,
  checkConfirmationCode,
};
