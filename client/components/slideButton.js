import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import FontAwesomeIcon from './fontAwesomeLibrary';

const SlideButton = props => (
  <div className="slider-button-wrapper">
    <div
      role="presentation"
      className="slider-button"
      onClick={props.handleBtnClick}
    >
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
