import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Icons from '../models/icons';
import Windows from '../models/Windows';

import rootReducer from '../../client/reducers';
import App from '../../client/app';

const preloadedState = {
  icons: Icons.getAll(),
  windows: []
};

const stringifiedState = JSON.stringify(preloadedState);

function index(req, res) {
  const store = createStore(rootReducer);
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
        <div id="root" />
        <script src="./client/index.js" />
      </body>
    </html>
  );

  res.end(html);
}

export default {
  index
};
