import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'react-poppop';

const PopupWrapper = props => {
  return (
    <Popup
      position="centerCenter"
      open={props.open}
      onClose={props.closePopup}
      contentStyle={props.contentStyle}
    >
      <div className="popup-wrapper">
        <h3>Vending Machine</h3>
        <p style={props.descriptionStyle}>{props.descriptionInfo}</p>

        {props.children}

        {props.displayBarBottom ? (
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
        ) : (
          ''
        )}
      </div>
    </Popup>
  );
};

PopupWrapper.defaultProps = {
  contentStyle: {
    borderRadius: '0px',
    padding: '0px',
    color: '#393d54',
    background: '#eff0f3',
    minHeight: 'calc(100% - 40px)',
    minWidth: 'calc(100% - 40px)',
    height: 'calc(100% - 40px)',
    width: 'calc(100% - 40px)',
    overflow: 'auto',
  },
  displayBarBottom: true,
  descriptionStyle: {color: 'red', opacity: '0.7', fontSize: '14px'},
};
PopupWrapper.propTypes = {
  open: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  contentStyle: PropTypes.objectOf(),
  displayBarBottom: PropTypes.bool,
  children: PropTypes.node.isRequired,
  descriptionInfo: PropTypes.string.isRequired,
  descriptionStyle: PropTypes.objectOf(),
};
export default PopupWrapper;
