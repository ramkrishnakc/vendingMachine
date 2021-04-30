import React from 'react';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faSearch,
  faTh,
  faTasks,
  faCogs,
  faCog,
  faUsers,
  faKey,
  faUser,
  faSignOutAlt,
  faExclamationTriangle,
  faTimesCircle,
  faHeartbeat,
  faSlidersH,
  faInfoCircle,
  faTimes,
  faAsterisk,
  faCheck,
  faLaptop,
  faStop,
  faRandom,
  faGift,
  faWrench,
  faEye,
  faEyeSlash,
  faHistory,
  faChevronRight as fasChevronRight,
  faChevronDown as fasChevronDown,
  faPlusCircle,
  faUserPlus,
  faUnlockAlt,
  faUniversity,
  faMoneyCheckAlt,
  faReceipt,
  faBookReader,
  faChalkboardTeacher,
  faExclamationCircle,
  faUsersCog,
  faUserClock,
  faPeopleCarry,
  faBookMedical,
  faChartBar,
  faChartLine,
  faListAlt,
  faCalendarAlt,
  faClock,
  faFileImage,
  faCoins,
  faPlusSquare,
  faTrash,
  faEdit,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
  faSquare,
  faCircle,
  faCopy,
  faClone,
} from '@fortawesome/free-regular-svg-icons';

const initFontAwesomeLibrary = () => {
  [
    faCoins,
    faPlusSquare,
    faTrash,
    faEdit,
    faAngleRight,
    faAngleLeft,

    faTachometerAlt,
    faSearch,
    faTh,
    faTasks,
    faCogs,
    faCog,
    faUsers,
    faKey,
    faUnlockAlt,
    faUser,
    faSignOutAlt,
    faExclamationTriangle,
    faTimesCircle,
    faHeartbeat,
    faSlidersH,
    faInfoCircle,
    faTimes,
    faAsterisk,
    faCheck,
    faLaptop,
    faStop,
    faRandom,
    faGift,
    faWrench,
    faEye,
    faEyeSlash,
    faHistory,
    fasChevronRight,
    fasChevronDown,

    faSquare,
    faCircle,
    faCopy,
    faClone,
    faPlusCircle,
    faUserPlus,

    faUniversity,
    faClock,
    faCalendarAlt,
    faMoneyCheckAlt,
    faReceipt,
    faBookReader,
    faChalkboardTeacher,
    faExclamationCircle,
    faUsersCog,
    faUserClock,
    faPeopleCarry,
    faBookMedical,
    faListAlt,
    faChartBar,
    faChartLine,
    faFileImage,
  ].forEach((icon) => {
    library.add(icon);
  });
};

initFontAwesomeLibrary();

const FontAwesomeIcon = (props) => {
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
