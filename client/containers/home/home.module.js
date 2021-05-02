import axios from 'axios';
import {get} from 'lodash';

import Util from '../../../common';
import {errorMsg, success} from '../../components/notify';

const prefix = 'Product';
const {addPrefix} = Util;
const FETCH_PRODUCTS = addPrefix(prefix, 'fetch_products');
const FETCH_PRODUCTS_SUCCESS = addPrefix(prefix, 'fetch_products_success');
const FETCH_PRODUCTS_FAILURE = addPrefix(prefix, 'fetch_products_failure');
const CHECKOUT = addPrefix(prefix, 'checkout');
const CHECKOUT_SUCCESS = addPrefix(prefix, 'checkout_success');
const CHECKOUT_FAILURE = addPrefix(prefix, 'checkout_failure');
const REFUND = addPrefix(prefix, 'refund');
const REFUND_SUCCESS = addPrefix(prefix, 'refund_success');
const REFUND_FAILURE = addPrefix(prefix, 'refund_failure');

const INITIAL_STATE = {
  purchases: [],
  products: [],
  coins: 0,
  random_id: '',
  requestInProgress: false,
};

/* -------------------------- actions ------------------ */
export const fetchProducts = () => {
  return dispatch => {
    dispatch({type: FETCH_PRODUCTS});
    return axios({
      method: 'GET',
      url: `/vendorapi/products`,
    })
      .then(res => {
        if (get(res, ['data', 'success'])) {
          return dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: get(res, ['data', 'data'], {
              products: [],
              coins: 0,
            }),
          });
        }
        errorMsg('Unable to fetch products from DB.');
        return dispatch({type: FETCH_PRODUCTS_FAILURE});
      })
      .catch(err => {
        errorMsg('Unable to fetch products from DB.');
        return dispatch({type: FETCH_PRODUCTS_FAILURE, payload: err});
      });
  };
};

export const handleCheckout = payload => {
  return dispatch => {
    dispatch({type: CHECKOUT});
    return axios
      .post('/vendorapi/products/checkout', payload, {})
      .then(res => {
        if (get(res, ['data', 'success'])) {
          success('Purchase successful.');
          return dispatch({type: CHECKOUT_SUCCESS, payload});
        }
        errorMsg('Unable to checkout. Internal server error.');
        return dispatch({type: CHECKOUT_FAILURE});
      })
      .catch(err => {
        errorMsg('Unable to checkout. Internal server error.');
        return dispatch({type: CHECKOUT_FAILURE, payload: err});
      });
  };
};

export const handleRefund = payload => {
  return dispatch => {
    dispatch({type: REFUND});
    return axios
      .post('/vendorapi/products/refund', payload, {})
      .then(res => {
        if (get(res, ['data', 'success'])) {
          success('Refund successful.');
          return dispatch({type: REFUND_SUCCESS, payload});
        }
        errorMsg('Unable to refund. Internal server error.');
        return dispatch({type: REFUND_FAILURE});
      })
      .catch(err => {
        errorMsg('Unable to refund. Internal server error.');
        return dispatch({type: REFUND_FAILURE, payload: err});
      });
  };
};

/* --------------------------------- reducer ---------------- */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REFUND:
    case CHECKOUT:
    case FETCH_PRODUCTS: {
      return {
        ...state,
        requestInProgress: true,
      };
    }

    case FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.payload.products.map(d => ({
          ...d,
          old_stock: d.product_stock,
        })),
        purchases: action.payload.purchases,
        coins: action.payload.coins,
        random_id: Util.randomString(5),
        requestInProgress: false,
      };
    }

    case FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        products: [],
        purchases: [],
        coins: 0,
        random_id: Util.randomString(5),
        requestInProgress: false,
      };
    }

    case CHECKOUT_SUCCESS: {
      return {
        ...state,
        coins: action.payload.coins,
        products: state.products.map(item => {
          const match = action.payload.products.find(
            ele => ele.product_id === item.product_id
          );

          if (match) {
            return {
              ...item,
              old_stock: match.product_stock,
              product_stock: match.product_stock,
            };
          }
          return item;
        }),
        random_id: Util.randomString(5),
        requestInProgress: false,
      };
    }

    case REFUND_SUCCESS: {
      return {
        ...state,
        coins: action.payload.coins,
        products: state.products.map(item => {
          const match = action.payload.products.find(
            ele => ele.product_name === item.product_name
          );

          if (match) {
            return {
              ...item,
              old_stock: item.old_stock + match.product_stock,
              product_stock: item.old_stock + match.product_stock,
            };
          }
          return item;
        }),
        random_id: Util.randomString(5),
        requestInProgress: false,
      };
    }

    case REFUND_FAILURE:
    case CHECKOUT_FAILURE: {
      return {
        ...state,
        requestInProgress: false,
        random_id: Util.randomString(5),
      };
    }

    default: {
      return state;
    }
  }
};
export default reducer;
