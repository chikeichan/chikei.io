import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import Icons from '../models/icons';
import Windows from '../models/Windows';


const preloadedState = {
  icons: Icons.getAll(),
  windows: []
};

const stringifiedState = JSON.stringify(preloadedState);

function index(req, res) {
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
