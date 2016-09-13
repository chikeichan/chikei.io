import React from 'react';
import {renderToString} from 'react-dom/server';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import Icons from '../models/icons';
import Windows from '../models/windows';
import Blogs from '../models/blogs';

import rootReducer from '../../client/reducers';
import App from '../../client/app';


function renderHTML(path = '', blog = { id: '' }) {
  const icons = Icons.getAll();
  const windows = [];

  const initialState = {
    icons: icons.reduce((map, icon) => {
      map[icon.id] = icon;
      return map;
    }, {}),
    windows: {}
  }

  if (path) {
    const appWindow = Windows.get(path);
    initialState.windows[appWindow.id] = appWindow;
    windows.push(appWindow);
  }

  if (blog.fixture) {
    initialState.windows[blog.fixture.id] = blog.fixture;
    windows.push(blog.fixture);
  }

  const stringifiedState = JSON.stringify({icons, windows});
  // Create a new Redux store instance
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>chikei.io | From Financial Controller to Model-View-Controller</title>
        <link href="https://fonts.googleapis.com/css?family=Lekton|Open+Sans" rel="stylesheet" />
        <link rel="stylesheet" type="text/css"  href="/styles/index.css" />
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-83615019-1', 'auto');
          ga('send', 'pageview');
        </script>
        <script>window.__PRELOADED_STATE__ = ${stringifiedState}</script>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/client/index.js"></script>
      </body>
    </html>
  `;
}

function index(req, res, next) {
  const html = renderHTML();
  res.send(html);
}

function windowPath(req, res, next) {
  const {path} = req.params;
  try {
    const html = renderHTML(path);
    res.send(html);
  } catch (e) {
    res.send(renderHTML('ERROR'));
  }
}

function blogPath(req, res, next) {
  const {path} = req.params;
  Blogs.getBlog(path, (err, blog) => {
    if (err) {
      return res.send(renderHTML('ERROR'));
    }

    const html = renderHTML(undefined, {
      id: path,
      fixture: blog
    });

    res.send(html);
  });
}

export default {
  index,
  windowPath,
  blogPath
};
