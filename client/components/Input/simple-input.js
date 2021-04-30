import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const SimpleInput = (props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if ((props.value || props.value === 0) && props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <input
      name={props.name}
      id={props.id}
      value={value}
      disabled={props.disabled}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={() => props.handler(value.trim())}
      min={props.type === 'number' ? 0 : null}
      type={props.type}
      placeholder={props.placeholder}
      data-index={props.dataIndex}
    />
  );
};
SimpleInput.defaultProps = {
  placeholder: '',
  dataIndex: '',
  disabled: false,
  value: '',
};

SimpleInput.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  dataIndex: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, null]),
};

export default SimpleInput;
