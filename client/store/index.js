import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import reducers from '../reducers';

const middlewares = [thunk];

const configureStore = (data) => {
  const finalCreateStore = composeWithDevTools({trace: true, traceLimit: 20})(
    applyMiddleware(...middlewares)
  )(createStore);
  const store = finalCreateStore(reducers, data);
  store.subscribe(() => {
    const state = {...store.getState()};
    localStorage.setItem('reduxState', JSON.stringify(state));
  });
  return store;
};
export default configureStore;
