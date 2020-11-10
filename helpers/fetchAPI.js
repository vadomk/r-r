'use strict';
//import npm modules
import axios from 'axios';
import { apply, call, cancelled } from 'redux-saga/effects';
//import local modules
import { applicationConfig } from '../config';

const _apiHost = applicationConfig.apiUrl;

function* request(url, method = 'GET', body = null) {
  const controller = new AbortController();

  try {
    const options = {
      method,
      headers: getHeader(),
      signal: controller.signal,
      body,
    };

    const response = yield call(fetch, _apiHost + url, options);
    const json = yield apply(response, response.json);
    if (!response.ok) {
      throw (json || 'Unknown error');
    }
    return json;
  } finally {
    if (yield cancelled()) {
      controller.abort();
    }
  }
}

function uploadFile(url, file, onProgress, path, fileName, disableOverwriting, data) {
  if (!file) {
    return Promise.resolve({ data: { filePath: '!' } });
  }
  const formData = new FormData();
  formData.append('upload', file, file.name);
  formData.append('path', path);
  formData.append('fileName', fileName);
  formData.append('disableOverwriting', disableOverwriting);
  if (data && data.contentParams) {
    formData.append('contentParams', JSON.stringify(data.contentParams));
  }
  return axios.request(
    {
      url: url,
      data: formData,
      method: 'POST',
      headers: {
        ...getHeader(),
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          if (onProgress) {
            onProgress(progressEvent.loaded, file.size);
          }
        }
      },
    },
  );
}

export function objectToQueryString(obj) {
  return Object.entries(obj).map(([ key, value ]) => key + '=' + encodeURI(value)).join('&');
}

function getHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return {
      'Authorization': 'Bearer ' + user.token,
      'Content-Type': 'application/json',
    };
  } else {
    return {
      'Content-Type': 'application/json',
    };
  }
}

export function apiGet(url, params) {
  const query = url + (params ? '?' + objectToQueryString(params) : '');
  return request(query);
}

export function apiCreate(url, params) {
  const body = JSON.stringify(params);
  return request(url, 'POST', body);
}

export function apiUpdate(url, params) {
  const body = JSON.stringify(params);
  return request(url, 'PUT', body);
}

export function apiRemove(url) {
  return request(url, 'DELETE');
}

export function apiCopy(url, params) {
  return request(url, 'COPY', params);
}

export function apiUploadFile(url, file, onProgress, path = '', fileName = '', disableOverwriting = 0, data) {
  return uploadFile(url, file, onProgress, path, fileName, disableOverwriting, data);
}

export function apiPost(url, params) {
  const body = JSON.stringify(params);
  return request(url, 'POST', body);
}
