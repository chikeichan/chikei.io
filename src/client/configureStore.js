import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';
import reduxCatch from 'redux-catch';
import rootReducer from './reducers';

const logger = createLogger();

export default function configureStore(initialState) {
  let middleware;

  if (process.env.NODE_ENV === "development") {
    middleware = applyMiddleware(reduxCatch(errorHandler), thunk, logger);
  } else {
    middleware = applyMiddleware(reduxCatch(errorHandler), thunk);
  }

  const store = createStore(
    rootReducer,
    middleware,
    persistState()
  );

  // When using WebPack, module.hot.accept should be used. In LiveReactload,
  // same result can be achieved by using "module.onReload" hook.
  if (module.onReload) {
    module.onReload(() => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer.default || nextReducer);

      // return true to indicate that this module is accepted and
      // there is no need to reload its parent modules
      return true
    });
  }

  return store;
}

function errorHandler(error, getState) {
  console.error(error);
  console.debug('current state', getState());
}
