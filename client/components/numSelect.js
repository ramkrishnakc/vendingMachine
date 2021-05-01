import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
const NumSelect = props => {
  const [qty, setQuantity] = useState(0);
  const [prevQty, setPrevQuantity] = useState(0);

  useEffect(() => {
    if (props.qty && props.qty !== prevQty) {
      setPrevQuantity(qty);
      if (props.qty !== qty) {
        setQuantity(props.qty);
      }
    }
  }, [props.qty]);

  return (
    <div className="num-select">
      <div
        className="num-minus"
        onClick={() => {
          const val = qty - 1;

          if (val >= 0) {
            setQuantity(val);
            props.setQtyFunction(val);
          }
        }}
      >
        -
      </div>
      <input
        type="text"
        className="num-input"
        value={qty}
        onChange={e => {
          const val = e.target.value;

          if (/^[0-9]*$/.test(val) && val <= props.limit) {
            setQuantity(val);
            props.setQtyFunction(val);
          }
        }}
      />
      <div
        type="button"
        className="num-add"
        onClick={() => {
          const val = qty + 1;

          if (val <= props.limit) {
            setQuantity(val);
            props.setQtyFunction(val);
          }
        }}
      >
        +
      </div>
    </div>
  );
};

NumSelect.propTypes = {
  limit: PropTypes.number.isRequired,
  setQtyFunction: PropTypes.func.isRequired,
  qty: PropTypes.number.isRequired,
};
export default NumSelect;
