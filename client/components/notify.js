import {toast} from 'react-toastify';
import React from 'react';
import FontAwesomeIcon from './fontAwesomeLibrary';

const SUCCESS = 'success';
const WARNING = 'warning';
const INFO = 'info';
const ERROR = 'error';

const defaultToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  hideProgressBar: true,
  closeButton: false,
};

const makeMessageInfoHTML = (msg, toastType) => {
  let iconName;
  switch (toastType) {
    case SUCCESS:
      iconName = 'check';
      break;
    case INFO:
      iconName = 'info-circle';
      break;
    case ERROR:
      iconName = 'times-circle';
      break;
    case WARNING:
      iconName = 'exclamation-triangle';
      break;
    default:
      iconName = 'info-circle';
      break;
  }
  return (
    <div className="flex">
      <div className="toast-background-image horizontal-align-center vertical-align-center flex">
        <FontAwesomeIcon icon={iconName} style={{fontSize: '18px'}} />
      </div>
      <div className="toast-message flex">{msg}</div>
      <div className="toast-close-button horizontal-align-center vertical-align-center flex">
        <FontAwesomeIcon icon="times" style={{fontSize: '16px'}} />
      </div>
    </div>
  );
};

const makeToast = (message, type, timeOut) =>
  toast[type](makeMessageInfoHTML(message, type), {
    ...defaultToastOptions,
    autoClose: timeOut || 6000,
    className: `toast ${type}`,
  });

export const success = (msg, timeOut) => makeToast(msg, SUCCESS, timeOut);
export const errorMsg = (msg, timeOut) => makeToast(msg, ERROR, timeOut);
export const warning = (msg, timeOut) => makeToast(msg, WARNING, timeOut);
export const info = (msg, timeOut) => makeToast(msg, INFO, timeOut);
