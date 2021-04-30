import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '../FontAwesomeLibrary';

import SimpleInput from './simple-input';
import TextArea from './text-area';
import PasswordStrength from './password-with-strength';
import PasswordWithIcon from './password-with-icon';
import Select from './select';
import Radio from './radio';
import BooleanCheckbox from './boolean-checkbox';
import Checkbox from './checkbox';
import CheckboxMultiselect from './checkbox-multi-select';
import MultiText from './multi-text';
import FileUpload from './fileUpload';

const simpleTypes = ['text', 'password', 'email', 'number', 'date'];

const Field = (props) => {
  const {type, title, label, style, id, className, error, ...rest} = props;
  const propObj = {type, id: id || props.name, ...rest};

  return (
    <div style={style} className={className}>
      {title && <p className="field-title">{title}</p>}
      <div className={`form-field ${error ? 'error' : ''}`}>
        {label && (
          <label htmlFor={id || props.name}>
            {label}
            <span className="required">
              {props.required && <FontAwesomeIcon icon="asterisk" />}
            </span>
          </label>
        )}
        {simpleTypes.includes(type) && <SimpleInput {...propObj} />}
        {type === 'text-area' && <TextArea {...propObj} />}
        {type === 'password-with-strength' && <PasswordStrength {...propObj} />}
        {type === 'password-with-icon' && <PasswordWithIcon {...propObj} />}
        {type === 'select' && <Select {...propObj} />}
        {type === 'radio' && <Radio {...propObj} />}
        {type === 'boolean-checkbox' && <BooleanCheckbox {...propObj} />}
        {type === 'checkbox' && <Checkbox {...propObj} />}
        {type === 'checkbox-multi-select' && (
          <CheckboxMultiselect {...propObj} />
        )}
        {type === 'multi-text' && <MultiText {...propObj} />}
        {type === 'file' && <FileUpload {...propObj} />}
      </div>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

Field.defaultProps = {
  className: 'form-field-wrapper',
  style: {},
  title: '',
  label: '',
  error: '',
  id: '',
  required: false,
};

Field.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default Field;
