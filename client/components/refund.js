import React from 'react';
import PropTypes from 'prop-types';

import PopupWrapper from './popup';

const x = [
  {
    purchase_id: 'PID001',
    purchase_date: '2022-Mar-15',
    purchase_amount: 300,
    purchase_array: [
      {
        product_id: 'PROD-003',
        product_name: 'Coke',
        product_rate: 20,
        product_quantity: 2,
        refund_quantity: 1,
        refund_date: '2022-Mar-21',
      },
      {
        product_id: 'PROD-002',
        product_name: 'Dew',
        product_rate: 30,
        product_quantity: 4,
        refund_quantity: 1,
        refund_date: '2022-Mar-21',
      },
    ],
  },
  {
    purchase_id: 'PID002',
    purchase_date: '2022-Apr-1',
    purchase_amount: 400,
    purchase_array: [
      {
        product_id: 'PROD-001',
        product_name: 'Pepsi',
        product_rate: 25,
        product_quantity: 4,
        refund_quantity: 2,
        refund_date: '2022-Apr-3',
      },
      {
        product_id: 'PROD-003',
        product_name: 'Coke',
        product_rate: 20,
        product_quantity: 3,
        refund_quantity: 2,
        refund_date: '2022-Apr-2',
      },
    ],
  },
  {
    purchase_id: 'PID002',
    purchase_date: '2022-Apr-1',
    purchase_amount: 201,
    purchase_array: [
      {
        product_id: 'PROD-001',
        product_name: 'Pepsi',
        product_rate: 25,
        product_quantity: 4,
        refund_quantity: 2,
        refund_date: '2022-Apr-3',
      },
      {
        product_id: 'PROD-003',
        product_name: 'Coke',
        product_rate: 20,
        product_quantity: 3,
        refund_quantity: 2,
        refund_date: '2022-Apr-2',
      },
    ],
  },
  {
    purchase_id: 'PID002',
    purchased_date: '2022-Apr-1',
    purchase_amount: 190,
    purchase_array: [
      {
        product_id: 'PROD-001',
        product_name: 'Pepsi',
        product_rate: 25,
        product_quantity: 4,
        refund_quantity: 2,
        refund_date: '2022-Apr-3',
      },
      {
        product_id: 'PROD-003',
        product_name: 'Coke',
        product_rate: 20,
        product_quantity: 3,
        refund_quantity: 2,
        refund_date: '2022-Apr-2',
      },
    ],
  },
  {
    purchase_id: 'PID002',
    purchase_date: '2022-Apr-1',
    purchase_amount: 304,
    purchase_array: [
      {
        product_id: 'PROD-001',
        product_name: 'Pepsi',
        product_rate: 25,
        product_quantity: 4,
        refund_quantity: 2,
        refund_date: '2022-Apr-3',
      },
      {
        product_id: 'PROD-003',
        product_name: 'Coke',
        product_rate: 20,
        product_quantity: 3,
        refund_quantity: 2,
        refund_date: '2022-Apr-2',
      },
    ],
  },
  {
    purchase_id: 'PID002',
    purchased_date: '2022-Apr-1',
    purchase_amount: 490,
    purchase_array: [
      {
        product_id: 'PROD-001',
        product_name: 'Pepsi',
        product_rate: 25,
        product_quantity: 4,
        refund_quantity: 2,
        refund_date: '2022-Apr-3',
      },
      {
        product_id: 'PROD-003',
        product_name: 'Coke',
        product_rate: 20,
        product_quantity: 3,
        refund_quantity: 2,
        refund_date: '2022-Apr-2',
      },
    ],
  },
];

const RefundPopup = props => {
  return (
    <PopupWrapper
      open={props.open}
      closePopup={props.closePopup}
      handleConfirm={props.handleConfirm}
      descriptionInfo="Please proceed with product return. Refund allowed only within 10 days of purchase."
    >
      {x.map(item => {
        const refundAmt = item.purchase_array.reduce(
          (acc, curr) => acc + curr.refund_quantity * curr.product_rate,
          0
        );
        return (
          <>
            <div className="purchase-info-wrapper">
              <div className="purchase-info">
                <div className="purchase-info-item" style={{marginLeft: '0px'}}>
                  <span className="bold">Purchase Date:</span>&nbsp;
                  {item.purchase_date}
                </div>
                <div className="purchase-info-item">
                  <span className="bold">Purchase Amount:</span>&nbsp; Rs.
                  {item.purchase_amount}
                </div>
                <div className="purchase-info-item">
                  <span className="bold">Refunded Amount:</span>&nbsp; Rs.
                  {refundAmt}
                </div>
              </div>
              <table cellSpacing="0" cellPadding="0">
                <thead>
                  {[
                    'Item',
                    'Qty',
                    'Rate',
                    'Refunded Date',
                    'Refunded Qty',
                    'Refunded Amt',
                  ].map(colHeader => (
                    <th>{colHeader}</th>
                  ))}
                </thead>
                <tbody>
                  {item.purchase_array.map(ele => (
                    <tr key={ele.product_id}>
                      <td>{ele.product_name}</td>
                      <td>{ele.product_quantity}</td>
                      <td>Rs.{ele.product_rate}</td>
                      <td>{ele.refund_date}</td>
                      <td>{ele.refund_quantity}</td>
                      <td>Rs.{ele.refund_quantity * ele.product_rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      })}
    </PopupWrapper>
  );
};

RefundPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  // items: PropTypes.arrayOf().isRequired,
  // amount: PropTypes.number.isRequired,
  // total: PropTypes.number.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
export default RefundPopup;
