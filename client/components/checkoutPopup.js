import React from 'react';
import PropTypes from 'prop-types';

import PopupWrapper from './popup';

const CheckoutPopup = props => {
  return (
    <PopupWrapper
      open={props.open}
      closePopup={props.closePopup}
      handleConfirm={props.handleConfirm}
      descriptionInfo="Please confirm your order and payment."
    >
      <table cellSpacing="0" cellPadding="0">
        <thead>
          {['Item', 'Qty', 'Rate', 'Price'].map(colHeader => (
            <th>{colHeader}</th>
          ))}
        </thead>
        <tbody>
          {props.items.map(item => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>Rs.{item.rate}</td>
              <td>Rs.{item.quantity * item.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bill-info">
        <h6>Total: Rs.{props.total}</h6>
        <h6>Payment: Rs.{props.amount}</h6>
        <h6>Return: Rs.{props.amount - props.total}</h6>
      </div>
    </PopupWrapper>
  );
};

CheckoutPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  items: PropTypes.arrayOf().isRequired,
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
export default CheckoutPopup;
