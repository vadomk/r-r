'use strict';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import rootReducer from '../reducers';
import {
  phoneSaga,
  carMakeSaga,
  carModelSaga
} from '../sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  thunkMiddleware,
  sagaMiddleware,
];
const enhancer = composeEnhancers(applyMiddleware(...middleware));

function* rootSaga() {
  yield all([
    phoneSaga(),
    carMakeSaga(),
    carModelSaga(),
  ]);
}

export const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);
