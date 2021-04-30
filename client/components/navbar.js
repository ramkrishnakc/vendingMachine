import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from './FontAwesomeLibrary';

const NavBar = (props) => (
  <div className="navigation-bar">
    <div className="section-title">Vendor Machine</div>
    <div className="action-items-container">
      <div className="circle-icon-container" role="presentation">
        <div className="circle-icon">
          <FontAwesomeIcon icon="coins" />
        </div>
        <div>Coins: {props.coins}</div>
      </div>

      <div
        className="right-label-icon-container"
        onClick={props.addProduct}
        role="presentation"
      >
        <div className="right-label-icon">
          <FontAwesomeIcon icon="plus-square" />
        </div>
        <div>Add Product</div>
      </div>
    </div>
  </div>
);

NavBar.defaultProps = {
  coins: 0,
};
NavBar.propTypes = {
  coins: PropTypes.number,
  addProduct: PropTypes.func.isRequired,
};

export default NavBar;
