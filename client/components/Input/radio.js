import React from 'react';
import PropTypes from 'prop-types';

const Radio = (props) => (
  <ul className="radio">
    {props.options.map((item) => {
      let label = item;
      let value = item;

      if (typeof item === 'object') {
        label = item[props.labelKey];
        value = item[props.valueKey];
      }

      return (
        <li key={label}>
          <input
            type={props.type}
            id={label}
            name={props.name}
            value={value}
            checked={props.value === value}
            onChange={(e) => props.handler(e.target.value)}
            disabled={props.disabled}
          />
          <label htmlFor={label}>
            <div className="radio-label-text">{label} </div>
          </label>
        </li>
      );
    })}
  </ul>
);

Radio.defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  disabled: false,
  value: '',
  options: [],
};

Radio.propTypes = {
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.any),
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, null]),
};

export default Radio;
