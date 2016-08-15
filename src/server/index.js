import 'babel-polyfill';

import express from 'express';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const app = express();

app.use(express.static('public'));
app.use(express.static('src/assets'));

app.get('/', (req, res) => {
  const html = renderToStaticMarkup(
    <html>
      <head>
        <title>Hello World</title>
        <link rel="stylesheet" type="text/css"  href="./styles/bundle.css" />
      </head>
      <body>
        <div id="root" />
        <script src="./client/bundle.js" />
      </body>
    </html>
  );

  res.end(html);
});


app.listen(8000, () => console.log('Listening on Port 8000...'));
