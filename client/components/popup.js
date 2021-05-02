import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'react-poppop';

const PopupWrapper = props => {
  return (
    <Popup
      position="centerCenter"
      open={props.open}
      onClose={props.closePopup}
      contentStyle={{...props.contentStyle, ...props.overrideContentStyle}}
      closeOnEsc={props.closeOnEsc}
      closeOnOverlay={props.closeOnOverlay}
    >
      <div className="popup-wrapper">
        <h3>{props.title}</h3>
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
  title: 'Vending Machine',
  contentStyle: {
    borderRadius: '0px',
    padding: '0px',
    color: '#393d54',
    background: '#eff0f3',
    minWidth: 'calc(100% - 10px)',
    width: 'calc(100% - 10px)',
    overflow: 'auto',
  },
  displayBarBottom: true,
  descriptionStyle: {color: 'red', opacity: '0.7', fontSize: '14px'},
  closeOnEsc: false,
  closeOnOverlay: false,
  overrideContentStyle: {},
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
  closeOnEsc: PropTypes.bool,
  closeOnOverlay: PropTypes.bool,
  overrideContentStyle: PropTypes.objectOf(),
  title: PropTypes.string,
};
export default PopupWrapper;
