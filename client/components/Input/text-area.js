import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (props.value && props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <textarea
      rows={props.textareaRows}
      style={props.inputStyle}
      name={props.name}
      id={props.id}
      value={value}
      disabled={props.disabled}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={() => props.handler(value.trim())}
      type={props.type}
      placeholder={props.placeholder}
      data-index={props.dataIndex}
    />
  );
};

TextArea.defaultProps = {
  placeholder: '',
  dataIndex: '',
  disabled: false,
  value: '',
  textareaRows: 10,
  inputStyle: {},
};

TextArea.propTypes = {
  textareaRows: PropTypes.number,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  dataIndex: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, null]),
  inputStyle: PropTypes.objectOf(PropTypes.any),
};

export default TextArea;
