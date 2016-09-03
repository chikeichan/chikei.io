import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

const logger = createLogger();

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );

  // When using WebPack, module.hot.accept should be used. In LiveReactload,
  // same result can be achieved by using "module.onReload" hook.
  if (module.onReload) {
    module.onReload(() => {
      console.log('readload')
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer.default || nextReducer);

      // return true to indicate that this module is accepted and
      // there is no need to reload its parent modules
      return true
    });
  }

  return store;
}
