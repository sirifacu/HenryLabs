import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import store from './redux/store.js';
import * as dotenv from 'dotenv';

dotenv.config();

const { REACT_APP_SERVER_HOST_API } = process.env;

axios.defaults.baseURL = REACT_APP_SERVER_HOST_API;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
