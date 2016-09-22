import React, {Component} from 'react';
import {render} from 'react-dom';
import { Provider, connect } from 'react-redux';
import App from './App';
import store from './store';

render(<Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'))