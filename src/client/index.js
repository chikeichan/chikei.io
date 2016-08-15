import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';

const rootElement = document.querySelector('#root');

render(
  <div>
    <h1>Hello World</h1>
    <img src="images/HelloWorld.png" />
  </div>,
  rootElement
);
