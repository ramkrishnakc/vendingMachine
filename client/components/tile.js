import React, {useState} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import NumSelect from './numSelect';

const Tile = props => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="tile-item">
      <div className="item-title capitalize">
        <h6>{props.name}</h6>
      </div>
      <div className="item-image">Image</div>
      <div className="item-info">
        <span>Price: Rs.{props.price}</span>
        &nbsp;
        {props.stock ? (
          <span className="in-stock">(In Stock: {props.stock})</span>
        ) : (
          ''
        )}
      </div>
      {props.stock ? (
        <div className="qty-select">
          Quantity:{' '}
          <NumSelect
            limit={props.stock}
            setQtyFunction={val => setQuantity(val)}
          />
        </div>
      ) : (
        <div className="out-of-stock">(Out of Stock)</div>
      )}
      <div
        role="presentation"
        className={cx('item-button-wrapper', {
          disable: props.buttonDisable,
        })}
        onClick={() => props.buttonOnClick(quantity)}
      >
        {props.buttonLabel}
      </div>
    </div>
  );
};

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  buttonOnClick: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonDisable: PropTypes.bool.isRequired,
};
export default Tile;
