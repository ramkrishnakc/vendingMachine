import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {get, set} from 'lodash';

import PopupWrapper from './popup';
import NumSelect from './numSelect';
import Utils from '../../common';

const getClass = (useBorder, useBackground) =>
  cx({'border-bottom-cell': useBorder, 'bg-color': useBackground});

const COL_HEADER = [
  'Date',
  'Item',
  'Qty',
  'Rate',
  'Amt',
  'Date',
  'Qty',
  'Amt',
  'Make Ret.',
  'Total Ret.',
];

/* Handle items addition & removal from return cart */
const getRefCart = (refCart, item, val) => {
  const match = refCart.find(ele => ele.name === item.product_name);

  if (!match) {
    refCart.push({
      name: item.product_name,
      rate: item.product_rate,
      qty: val,
    });
  } else {
    match.qty += val;
    /* Remove element from cart if quantity is nil */
    if (!match.qty) {
      return refCart.filter(ele => ele.name !== item.product_name);
    }
  }

  return refCart;
};

const RefundPopup = props => {
  const [uniqId, setUniqId] = useState('');
  const [items, setItems] = useState([]);
  const [refCart, setRefCart] = useState([]);
  const [openRefCart, setOpenRefCartBool] = useState(false);

  useEffect(() => {
    if (uniqId !== props.random_id) {
      setUniqId(props.random_id);
      setItems(props.purchases);
    }
  }, [props.random_id, props.purchases]);

  const refundAmount = refCart.reduce(
    (acc, cur) => acc + cur.qty * cur.rate,
    0
  );

  return (
    <PopupWrapper
      open={props.open}
      closePopup={props.closePopup}
      handleConfirm={() => refCart.length && setOpenRefCartBool(true)}
      descriptionInfo="Please proceed with product return. Refund is allowed only within 10 days of purchase."
    >
      <table className="font-size-13" cellSpacing="0" cellPadding="0">
        <thead>
          <th colSpan="5" className="text-center bg-color less-opacity">
            Purchase Details
          </th>
          <th colSpan="5" className="text-center">
            Refund Details
          </th>
        </thead>
        <thead>
          {COL_HEADER.map((col, idx) => (
            <th className={cx({'bg-color': idx < 5, 'less-opacity': idx < 5})}>
              {col}
            </th>
          ))}
        </thead>
        <tbody>
          {items.map((item, outerIdx) => {
            const len = item.purchase_array.length;
            const refundAmt = item.purchase_array.reduce(
              (acc, curr) => acc + curr.refund_quantity * curr.product_rate,
              0
            );

            return item.purchase_array.map((ele, idx) => {
              const bool = idx === len - 1;
              return (
                <tr>
                  {idx === 0 && (
                    <td rowSpan={len} className={getClass(true, true)}>
                      {Utils.displayDate(item.purchase_date)}
                    </td>
                  )}
                  <td className={getClass(bool, true)}>{ele.product_name}</td>
                  <td className={getClass(bool, true)}>
                    {ele.product_quantity}
                  </td>
                  <td className={getClass(bool, true)}>
                    Rs.{ele.product_rate}
                  </td>
                  {idx === 0 && (
                    <td rowSpan={len} className={getClass(true, true)}>
                      Rs.{item.purchase_amount}
                    </td>
                  )}
                  <td className={getClass(bool)}>
                    {Utils.displayDate(ele.refund_date)}
                  </td>
                  <td className={getClass(bool)}>
                    {ele.refund_quantity || '-'}
                  </td>
                  <td className={getClass(bool)}>
                    Rs.{ele.refund_quantity * ele.product_rate}
                  </td>
                  <td className={getClass(bool)}>
                    <div className="qty-select qty-select-cart-edit">
                      <NumSelect
                        qty={ele.new_refund}
                        max={ele.product_quantity - ele.refund_quantity}
                        setQtyFunction={val => {
                          const oldValue = get(
                            items,
                            `[${outerIdx}].purchase_array[${idx}].new_refund`,
                            0
                          );
                          const diff = val - oldValue;

                          setRefCart(getRefCart(refCart, ele, diff));

                          set(
                            items,
                            `[${outerIdx}].purchase_array[${idx}].new_refund`,
                            val
                          );
                          setItems(items);
                        }}
                      />
                    </div>
                  </td>
                  {idx === 0 && (
                    <td rowSpan={len} className={getClass(true)}>
                      Rs.{refundAmt}
                    </td>
                  )}
                </tr>
              );
            });
          })}
        </tbody>
      </table>

      <PopupWrapper
        open={openRefCart}
        closePopup={() => setOpenRefCartBool(false)}
        handleConfirm={() => {
          props.handleConfirm(items, refCart);
          setOpenRefCartBool(false);
        }}
        title="Return Confirmation"
        descriptionInfo={`Please confirm your return request. You will be refunded with Rs.${refundAmount} once your return request is processed.`}
        overrideContentStyle={{
          minWidth: 'calc(100% - 50px)',
          width: 'calc(100% - 50px)',
        }}
      >
        <table className="font-size-13" cellSpacing="0" cellPadding="0">
          <thead>
            <th>Item</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Refund</th>
          </thead>
          <tbody>
            {refCart.map(item => (
              <tr>
                <td>{item.name}</td>
                <td>Rs.{item.rate}</td>
                <td>{item.qty}</td>
                <td>Rs.{item.rate * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PopupWrapper>
    </PopupWrapper>
  );
};

RefundPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  purchases: PropTypes.arrayOf().isRequired,
  handleConfirm: PropTypes.func.isRequired,
  random_id: PropTypes.string.isRequired,
};
export default RefundPopup;
