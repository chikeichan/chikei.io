import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from './reducers';
import App from './app';

const logger = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
