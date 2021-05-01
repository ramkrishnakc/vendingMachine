import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import FontAwesomeIcon from './fontAwesomeLibrary';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
const SlideButton = props => (
  <div className="slider-button-wrapper">
    <div className="slider-button" onClick={props.handleBtnClick}>
      <FontAwesomeIcon
        className={cx({
          'hide-content': !props.sliderHidden,
        })}
        icon="angle-left"
      />
      <FontAwesomeIcon
        className={cx({
          'hide-content': props.sliderHidden,
        })}
        icon="angle-right"
      />
    </div>
  </div>
);

SlideButton.propTypes = {
  handleBtnClick: PropTypes.func.isRequired,
  sliderHidden: PropTypes.bool.isRequired,
};
export default SlideButton;
