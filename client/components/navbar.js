import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from './fontAwesomeLibrary';

const NavBar = props => (
  <div className="navigation-bar">
    <div className="section-title">Vendor Machine</div>
    <div className="action-items-container">
      <div className="circle-icon-container" style={{cursor: 'auto'}}>
        <div className="circle-icon">
          <FontAwesomeIcon icon="coins" style={{cursor: 'auto'}} />
        </div>
        <div>Coins: {props.coins}</div>
      </div>

      <div
        className="right-label-icon-container"
        onClick={props.refund}
        role="presentation"
      >
        <div className="right-label-icon">
          <FontAwesomeIcon icon="exchange-alt" />
        </div>
        <div>Refund</div>
      </div>
    </div>
  </div>
);

NavBar.defaultProps = {
  coins: 0,
};
NavBar.propTypes = {
  coins: PropTypes.number,
  refund: PropTypes.func.isRequired,
};

export default NavBar;
