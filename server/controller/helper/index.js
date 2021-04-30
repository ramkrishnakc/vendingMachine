import fs from 'fs';
import path from 'path';

import config from '../../config';

const {logger} = config;

export const getErrorObject = (code, message, logMsg) => {
  const errorObject = {success: false, message};
  // Log error if needed
  if (logMsg) {
    logger.error(logMsg);
  }

  if (message) {
    return errorObject;
  }

  switch (code) {
    case 400:
      errorObject.message = 'Bad request';
      break;
    case 401:
      errorObject.message = 'Unautorized request';
      break;
    case 403:
      errorObject.message = 'Forbidden request';
      break;
    case 404:
      errorObject.message = 'Request Not Found';
      break;
    case 405:
      errorObject.message = 'Method Not Allowed';
      break;
    case 412:
      errorObject.message = 'Precondition failed';
      break;
    case 415:
      errorObject.message = 'Unsupported Content-type';
      break;
    case 429:
      errorObject.message = 'Too many requests';
      break;
    default:
      errorObject.message = 'Internal server error';
  }
  return errorObject;
};

export const sendErrorResponse = ({res, code = 500, message, logMsg}) =>
  res.status(code).send(getErrorObject(code, message, logMsg));

export const sendSuccessResponse = (res, data, logMsg) => {
  const successObject = {success: true};
  if (data) {
    successObject.data = data;
  }
  // Log success message if needed
  if (logMsg) {
    logger.info(logMsg);
  }
  return res.status(200).send(successObject);
};

/* Create folders recursively */
export const mkDirByPathSync = (
  targetDir,
  {isRelativeToScript = false} = {}
) => {
  const {sep} = path;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') {
        // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') {
        // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || (caughtErr && curDir === path.resolve(targetDir))) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
};
