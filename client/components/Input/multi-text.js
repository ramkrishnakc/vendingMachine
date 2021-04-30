import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {uniq} from 'lodash';
import FontAwesomeIcon from '../FontAwesomeLibrary';

const MultipleText = (props) => {
  const [value, setValue] = useState('');

  return (
    <>
      {props.list.length > 0 && (
        <ul className="arrayList">
          {props.list.map((item, index) => (
            <li key={item}>
              <div className="multilist-item">
                <span>{item}</span>
                {/* eslint-disable-next-line */}
                <span
                  className="cross"
                  onClick={() => {
                    if (!props.disabled) {
                      props.delete(index, props.name);
                    }
                  }}
                >
                  <FontAwesomeIcon icon="times-circle" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="multilist-input-wrapper">
        <input
          className="multilist-input"
          name={props.name}
          id={props.id}
          value={value}
          disabled={props.disabled}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && props.isValid(value, props.list)) {
              props.handler(uniq(props.list.concat(value)));
              setValue('');
            }
          }}
          onChange={(e) => {
            setValue(e.target.value.trim());
          }}
          type={props.type}
          placeholder={props.placeholder}
        />
        <span className="clear">
          <FontAwesomeIcon
            style={{
              color: 'rgb(169,169,169)',
              transform: 'rotate(90deg)',
              fontSize: '13px',
            }}
            icon={['fas', 'level-down']}
          />
        </span>
      </div>
    </>
  );
};

MultipleText.defaultProps = {
  disabled: null,
  list: [],
  isValid: () => true,
};

MultipleText.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isValid: PropTypes.func,
  handler: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

MultipleText.defaultProps = {
  isValid: () => true,
};

export default MultipleText;
