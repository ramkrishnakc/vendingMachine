import React from 'react';
import PropTypes from 'prop-types';

const BooleanCheckbox = (props) => (
  <>
    <input
      type="checkbox"
      name={props.name}
      disabled={props.disabled}
      id={props.id}
      checked={props.value}
      onChange={props.handler}
    />
    <label htmlFor={props.id}>{props.checkboxLabel}</label>
  </>
);

BooleanCheckbox.defaultProps = {
  disabled: false,
  value: '',
  checkboxLabel: '',
};

BooleanCheckbox.propTypes = {
  checkboxLabel: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape, null]),
};
export default BooleanCheckbox;
