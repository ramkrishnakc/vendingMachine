import React from 'react';
import PropTypes from 'prop-types';

const FormWrapper = (props) => (
  <div className={props.className} style={props.style}>
    {props.children}
  </div>
);

FormWrapper.defaultProps = {
  className: 'form-wrapper',
  style: {},
};
FormWrapper.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.element.isRequired,
};

export default FormWrapper;
