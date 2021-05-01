import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import CreateStore from './store';
import Routes from './routes';

let prevStoredState = localStorage.getItem('reduxState');
if (prevStoredState === null) {
  prevStoredState = {};
} else {
  prevStoredState = JSON.parse(prevStoredState);
}
const store = CreateStore(prevStoredState);

require('../static/css/foundation.css');
require('../static/css/fonts.css');
require('../static/css/styles.css');
require('../static/scss/index.scss');

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <Routes />
  </Provider>,
  document.querySelector('#react-root')
);

// eslint-disable-next-line no-undef
if (module.hot) {
  module.hot.accept(); // eslint-disable-line no-undef
}
