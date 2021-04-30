import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import FontAwesomeIcon from '../FontAwesomeLibrary';

const isTooShort = (password, minLength) => password.length < minLength;

const PasswordStrength = (props) => {
  const [score, setScore] = useState(0);
  const [isValid, setValidity] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (props.value && props.value !== password) {
      setPassword(props.value);
    }
  }, [props.value]);

  const inputClasses = [
    `${props.namespace}-input`,
    password.length > 0 ? `is-strength-${score}` : '',
  ];
  const strengthDesc = isTooShort(password, props.minLength)
    ? props.tooShortWord
    : props.scoreWords[score];

  if (isValid === true) {
    inputClasses.push('is-password-valid');
  } else if (password.length > 0) {
    inputClasses.push('is-password-invalid');
  }

  return (
    <>
      <input
        type={show ? 'text' : 'password'}
        value={password}
        name={props.name}
        id={props.id}
        disabled={props.disabled}
        className={inputClasses.join(' ')}
        onChange={(e) => {
          const pwd = e.target.value.trim();
          let result = null;
          let resultScore = 0;

          if (!isTooShort(pwd, props.minLength)) {
            result = zxcvbn(password, props.userInputs);
            resultScore = result.score;
          }

          setValidity(resultScore >= props.minScore);
          setPassword(pwd);
          setScore(resultScore);
        }}
        onBlur={() => {
          if (isValid && typeof props.handler === 'function') {
            props.handler(password);
          }
        }}
      />

      <div className={`${props.namespace}-strength-bar`} />
      <span className={`${props.namespace}-strength-desc`}>
        {strengthDesc}
        {props.iconIsHidden ? (
          ''
        ) : (
          // eslint-disable-next-line
          <span onClick={() => setShow(!show)} className="show-hide-icon">
            {show ? (
              <FontAwesomeIcon icon="eye" />
            ) : (
              <FontAwesomeIcon icon="eye-slash" />
            )}
          </span>
        )}
      </span>
    </>
  );
};

PasswordStrength.defaultProps = {
  handler: null,
  id: '',
  value: '',
  minLength: 8,
  minScore: 2,
  namespace: 'password-with-strength',
  scoreWords: ['Weak', 'Weak', 'Okay', 'Good', 'Strong'],
  tooShortWord: 'Too Short',
  userInputs: [],
  disabled: false,
  name: '',
  iconIsHidden: false,
};

PasswordStrength.propTypes = {
  handler: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  minLength: PropTypes.number,
  minScore: PropTypes.number,
  namespace: PropTypes.string,
  scoreWords: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  tooShortWord: PropTypes.string,
  userInputs: PropTypes.arrayOf(),
  name: PropTypes.string,
  iconIsHidden: PropTypes.bool,
};

export default PasswordStrength;
