import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const SelectInput = (props) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (props.value && props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);

  const options = props.options.map((option) =>
    typeof option === 'string' ? {label: option, value: option} : option
  );

  return (
    <Select
      classNamePrefix={props.className}
      className={props.className}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      value={
        typeof value === 'string'
          ? options.filter((option) => {
              return option[props.valueKey] === value;
            })
          : value
      }
      labelKey={props.labelKey}
      valueKey={props.valueKey}
      options={options}
      onChange={(val) => {
        setValue(val);
        props.selectHandler(val && val[props.valueKey]);
      }}
      multi={props.multi}
    />
  );
};

SelectInput.defaultProps = {
  className: 'Select',
  placeholder: '',
  disabled: false,
  value: '',
  labelKey: 'label',
  valueKey: 'value',
  multi: false, // allow multiple select
};

SelectInput.propTypes = {
  multi: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectHandler: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape, null]),
};
export default SelectInput;
