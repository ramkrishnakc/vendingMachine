import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'react-poppop';

const CheckoutPopup = props => {
  return (
    <Popup
      position="centerCenter"
      open={props.open}
      onClose={props.closePopup}
      contentStyle={props.contentStyle}
    >
      <div className="popup-wrapper checkout-confirm-wrapper">
        <h3>Vending Machine</h3>
        <p>Please confirm your order and payment.</p>

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

        <div className="bar-bottom">
          <div
            role="presentation"
            className="bar-btn confirm-btn"
            onClick={props.handleConfirm}
          >
            Confirm
          </div>
          <div
            role="presentation"
            className="bar-btn cancel-btn"
            onClick={props.closePopup}
          >
            Cancel
          </div>
        </div>
      </div>
    </Popup>
  );
};

CheckoutPopup.defaultProps = {
  contentStyle: {
    borderRadius: '0px',
    padding: '0px',
    color: '#393d54',
    background: '#eff0f3',
    height: '50%',
    width: '50%',
  },
};
CheckoutPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  items: PropTypes.arrayOf().isRequired,
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  contentStyle: PropTypes.objectOf(),
};
export default CheckoutPopup;
