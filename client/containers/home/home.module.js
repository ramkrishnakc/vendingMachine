import axios from 'axios';
import {get} from 'lodash';
import Util from '../../../common';

const prefix = 'Product';
const {addPrefix} = Util;
const FETCH_PRODUCTS = addPrefix(prefix, 'fetch_products');
const FETCH_PRODUCTS_SUCCESS = addPrefix(prefix, 'fetch_products_success');
const FETCH_PRODUCTS_FAILURE = addPrefix(prefix, 'fetch_products_failure');
const CHECKOUT = addPrefix(prefix, 'checkout');
const CHECKOUT_SUCCESS = addPrefix(prefix, 'checkout_success');
const CHECKOUT_FAILURE = addPrefix(prefix, 'checkout_failure');

const INITIAL_STATE = {
  products: [],
  coins: 0,
  checkingOut: false,
  fetchingData: false,
};

/* -------------------------- actions ------------------ */
export const fetchProducts = () => {
  return dispatch => {
    dispatch({type: FETCH_PRODUCTS});
    return axios({
      method: 'GET',
      url: `/vendorapi/product`,
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
        return dispatch({type: FETCH_PRODUCTS_FAILURE});
      })
      .catch(err => {
        return dispatch({type: FETCH_PRODUCTS_FAILURE, payload: err});
      });
  };
};

export const handleCheckout = payload => {
  return dispatch => {
    dispatch({type: CHECKOUT});
    return axios
      .post('/vendorapi/product/checkout', payload, {})
      .then(res => {
        if (get(res, ['data', 'success'])) {
          return dispatch({type: CHECKOUT_SUCCESS, payload});
        }
        return dispatch({type: CHECKOUT_FAILURE});
      })
      .catch(err => {
        return dispatch({type: CHECKOUT_FAILURE, payload: err});
      });
  };
};

/* --------------------------------- reducer ---------------- */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        fetchingData: true,
      };
    }

    case FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.payload.products,
        coins: action.payload.coins,
        fetchingData: false,
      };
    }

    case FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        products: [],
        coins: 0,
        fetchingData: false,
      };
    }

    case CHECKOUT: {
      return {
        ...state,
        checkingOut: true,
      };
    }

    case CHECKOUT_SUCCESS: {
      return {
        ...state,
        coins: action.payload.coins,
        checkingOut: false,
      };
    }

    case CHECKOUT_FAILURE: {
      return {
        ...state,
        checkingOut: false,
      };
    }

    default: {
      return state;
    }
  }
};
export default reducer;
