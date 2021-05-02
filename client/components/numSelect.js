import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

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
        role="presentation"
        className="num-minus"
        onClick={() => {
          const val = qty - 1;

          if (val >= props.min) {
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

          if (/^[0-9]*$/.test(val) && val >= props.min && val <= props.max) {
            setQuantity(val);
            props.setQtyFunction(val);
          }
        }}
      />
      <div
        role="presentation"
        className="num-add"
        onClick={() => {
          const val = qty + 1;

          if (val <= props.max) {
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

NumSelect.defaultProps = {
  min: 0,
};

NumSelect.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
  setQtyFunction: PropTypes.func.isRequired,
  qty: PropTypes.number.isRequired,
};
export default NumSelect;
