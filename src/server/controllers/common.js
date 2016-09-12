import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import Icons from '../models/icons';
import Windows from '../models/windows';
import rootReducer from '../../client/reducers';
import App from '../../client/app';

const preloadedState = {
  icons: Icons.getAll(),
  windows: []
};

const initialStore = {
  icons: Icons.getAll().reduce((map, icon) => {
    map[icon.id] = icon
    return map
  }, {}),
  windows: {}
}

const stringifiedState = JSON.stringify(preloadedState);

function index(req, res) {
  // Create a new Redux store instance
  const store = createStore(rootReducer, initialStore, applyMiddleware(thunk));

  // Render the component to a string
  const app = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const html = renderToStaticMarkup(
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hello World</title>
        <link href="https://fonts.googleapis.com/css?family=Lekton|Open+Sans" rel="stylesheet" />
        <link rel="stylesheet" type="text/css"  href="./styles/index.css" />
        <script dangerouslySetInnerHTML={{__html: `window.__PRELOADED_STATE__ = ${stringifiedState}`}} />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{__html: app}} />
        <script src="./client/index.js" />
      </body>
    </html>
  );

  res.end(html);
}

export default {
  index
};
