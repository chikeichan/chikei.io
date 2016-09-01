import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

function index(req, res) {
  const html = renderToStaticMarkup(
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hello World</title>
        <link href="https://fonts.googleapis.com/css?family=Lekton|Open+Sans" rel="stylesheet" />
        <link rel="stylesheet" type="text/css"  href="./styles/bundle.css" />
      </head>
      <body>
        <div id="root" />
        <script src="./client/bundle.js" />
      </body>
    </html>
  );

  res.end(html);
}

export default {
  index
};
