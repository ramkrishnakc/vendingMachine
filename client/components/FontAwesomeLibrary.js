import React from 'react';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {
  faCoins,
  faPlusSquare,
  faTrash,
  faEdit,
  faAngleRight,
  faAngleLeft,
  faCheck,
  faInfoCircle,
  faExclamationTriangle,
  faTimesCircle,
  faExchangeAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const initFontAwesomeLibrary = () => {
  [
    faCoins,
    faPlusSquare,
    faTrash,
    faEdit,
    faAngleRight,
    faAngleLeft,
    faCheck,
    faInfoCircle,
    faExclamationTriangle,
    faTimesCircle,
    faExchangeAlt,
    faTimes,
  ].forEach(icon => {
    library.add(icon);
  });
};

initFontAwesomeLibrary();

const FontAwesomeIcon = props => {
  const {style, icon, ...otherProps} = props;
  return (
    <Icon style={{cursor: 'pointer', ...style}} icon={icon} {...otherProps} />
  );
};

FontAwesomeIcon.defaultProps = {
  style: {},
};

FontAwesomeIcon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  style: PropTypes.objectOf(PropTypes.any),
};

export default FontAwesomeIcon;
