import axios from 'axios';
import {get} from 'lodash';
import Util from '../../../common';

const prefix = 'Product';
const {addPrefix} = Util;
const FETCH_PRODUCTS = addPrefix(prefix, 'fetch_products');
const FETCH_PRODUCTS_SUCCESS = addPrefix(prefix, 'fetch_products_success');
const FETCH_PRODUCTS_FAILURE = addPrefix(prefix, 'fetch_products_failure');
const SUBMIT_FORM = addPrefix(prefix, 'submit_form');
const SUBMIT_FORM_SUCCESS = addPrefix(prefix, 'submit_form_success');
const SUBMIT_FORM_FAILURE = addPrefix(prefix, 'submit_form_failure');
const UPDATE_FORM_FIELD = addPrefix(prefix, 'update_form');

const INITIAL_STATE = {
  create: {
    product_name: '',
    product_price: 0,
    product_stock: 0,
    product_image: null,
  },
  list: [],
  formSubmissionStarted: false,
  fetchingData: false,
};

/* -------------------------- Library actions ------------------ */
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch({type: FETCH_PRODUCTS});
    return axios({
      method: 'GET',
      url: `/vendorapi/product`,
    })
      .then((res) => {
        if (get(res, ['data', 'success'])) {
          return dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: get(res, ['data', 'data'], []),
          });
        }
        return dispatch({type: FETCH_PRODUCTS_FAILURE});
      })
      .catch((err) => {
        return dispatch({type: FETCH_PRODUCTS_FAILURE, payload: err});
      });
  };
};

// export const updateForm = (payload) => {
//   return (dispatch) => dispatch({type: UPDATE_FORM_FIELD, payload});
// };

// export const submitForm = (payload) => {
//   return (dispatch) => {
//     dispatch({type: SUBMIT_FORM});
//     return axios
//       .post('/smapi/library', payload, {})
//       .then((res) => {
//         if (get(res, ['data', 'success'])) {
//           return dispatch({type: SUBMIT_FORM_SUCCESS});
//         }
//         return dispatch({type: SUBMIT_FORM_FAILURE});
//       })
//       .catch((err) => {
//         return dispatch({type: SUBMIT_FORM_FAILURE, payload: err});
//       });
//   };
// };

// export const fetchData = (payload) => {
//   return (dispatch) => {
//     dispatch({type: FETCH_BOOKS_LIST});
//     return axios({
//       method: payload.method,
//       url: `/smapi/${payload.endpoint}`,
//       data: payload.data,
//     })
//       .then((res) => {
//         if (get(res, ['data', 'success'])) {
//           return dispatch({
//             type: FETCH_BOOKS_LIST_SUCCESS,
//             payload: get(res, ['data', 'data'], []),
//           });
//         }
//         return dispatch({type: FETCH_BOOKS_LIST_FAILURE});
//       })
//       .catch((err) => {
//         return dispatch({type: FETCH_BOOKS_LIST_FAILURE, payload: err});
//       });
//   };
// };

/* --------------------------------- Library reducer ---------------- */
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
        list: action.payload,
        fetchingData: false,
      };
    }

    case FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        list: [],
        fetchingData: false,
      };
    }

    case SUBMIT_FORM: {
      return {
        ...state,
        formSubmissionStarted: true,
      };
    }

    case SUBMIT_FORM_SUCCESS: {
      return {
        ...state,
        create: INITIAL_STATE.create,
        formSubmissionStarted: false,
      };
    }

    case SUBMIT_FORM_FAILURE: {
      return {
        ...state,
        formSubmissionStarted: false,
      };
    }

    case UPDATE_FORM_FIELD: {
      return {...state, create: {...state.create, ...action.payload}};
    }

    default: {
      return state;
    }
  }
};
export default reducer;
