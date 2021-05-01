import React, {useState} from 'react';
import PropTypes from 'prop-types';

import NumSelect from './numSelect';
import FontAwesomeIcon from './fontAwesomeLibrary';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

const getStockLimit = (list, item) => {
  const match = list.find((ele) => ele.product_name === item.name);
  return match ? match.old_stock : item.quantity;
};

const proceedCheckout = ({amount, total, coins, setError, handleCheckout}) => {
  if (!amount) {
    setError('');
    return;
  }

  // Handle checkout conditions
  let errMsg = '';

  if (!total) {
    errMsg = 'No item in cart. Could not proceed.';
  }

  const returnAmt = amount - total;
  if (returnAmt < 0) {
    errMsg = `You are Rs.${-returnAmt} short in your bills. Correct your payment before proceeding.`;
  }
  if (returnAmt > coins) {
    errMsg = `Machine has ${coins} coins only. Could not provide the change. Please pay accordingly.`;
  }

  setError(errMsg);
  // You are allowed to checkout now
  if (!errMsg) {
    handleCheckout({amount, total});
  }
};

const Cart = (props) => {
  const [amount, setBillAmount] = useState('');
  const [error, setError] = useState('');

  const hasItems = Array.isArray(props.items) && props.items.length;

  if (!hasItems) {
    return <h5 className="no-item">No items in cart!!</h5>;
  }

  const total = hasItems
    ? props.items.reduce((acc, curr) => acc + curr.quantity * curr.rate, 0)
    : 0;

  return (
    <>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          {['Item', 'Qty', 'Rate', 'Price', ' '].map((colHeader) => (
            <th>{colHeader}</th>
          ))}
        </thead>
        <tbody>
          {props.items.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>
                <div className="qty-select qty-select-cart-edit">
                  <NumSelect
                    qty={item.quantity}
                    limit={getStockLimit(props.productsList, item)}
                    setQtyFunction={props.setQtyFunction(item)}
                  />
                </div>
              </td>
              <td>Rs.{item.rate}</td>
              <td>Rs.{item.quantity * item.rate}</td>
              <td className="action-items">
                <FontAwesomeIcon
                  icon="trash"
                  title="Remove from Cart"
                  onClick={() => props.deleteFromCart(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-info">
        <h6>Total: Rs.{total}</h6>
      </div>
      <hr />

      <div className="pay-bill">
        <h5>Payment:</h5>
        <p>Please pay your bill before you checkout.</p>
        <div className="pay-bill-input">
          <input
            type="text"
            placeholder="Enter your payment here"
            value={amount}
            onChange={(e) => {
              const val = e.target.value;

              if (/^[0-9]*$/.test(val)) {
                setBillAmount(val);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();

                proceedCheckout({
                  amount,
                  total,
                  setError,
                  coins: props.coins,
                  handleCheckout: props.handleCheckout,
                });
              }
            }}
          />
        </div>
        <div className="error-msg">{error}</div>
      </div>

      <div
        className="btn-wrap"
        onClick={() =>
          proceedCheckout({
            amount,
            total,
            setError,
            coins: props.coins,
            handleCheckout: props.handleCheckout,
          })
        }
      >
        {props.buttonLabel}
      </div>
    </>
  );
};

Cart.propTypes = {
  items: PropTypes.arrayOf().isRequired,
  productsList: PropTypes.arrayOf().isRequired,
  handleCheckout: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  setQtyFunction: PropTypes.func.isRequired,
  coins: PropTypes.number.isRequired,
};
export default Cart;
