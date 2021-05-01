import log4js from 'log4js';
import fs from 'fs';

const stringAppendForAuditLog = 'VendorMachineApp; type=audit_log; ';

const layout = {
  type: 'pattern',
  pattern: '%d{yyyy-MM-dd_hh:mm:ss} %h %p: %m%n',
};

const logObject = (logDirectory, str) => ({
  type: 'file',
  filename: `${logDirectory}/${str ? `app_${str}` : 'app'}.log`,
  maxLogSize: 500000,
  backups: 3,
  layout,
});

const categoryObject = (category, type, level) => ({
  appenders: [category, type || 'console'],
  level: level || 'info',
});

/* Get configuration object for Logger */
const getLoggerConfig = logDirectory => ({
  appenders: {
    console: {
      type: 'console',
      layout,
    },
    normal: logObject(logDirectory),
    exception: logObject(logDirectory, 'exception'),
    audit: logObject(logDirectory, 'audit'),
  },
  categories: {
    default: categoryObject('console', 'normal'),
    normal: categoryObject('normal'),
    audit: categoryObject('audit'),
    exception: categoryObject('exception', null, 'error'),
  },
});

const makeDirectory = folderPath => {
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  } catch (e) {} // eslint-disable-line no-empty
};
export default class Logger {
  constructor(args = {}) {
    makeDirectory(args.logDirectory); // Make log directory if doesn't exists
    const loggerConfig = getLoggerConfig(args.logDirectory);
    log4js.configure(loggerConfig);

    this.logger = log4js.getLogger('audit');
    this.normallogger = log4js.getLogger('normal');
    this.normallogger.level = 'INFO';
    this.logger.level = 'DEBUG';
    if (process.env.NODE_ENV === 'development') {
      this.normallogger.level = 'TRACE';
      this.logger.level = 'DEBUG';
    }
  }

  logMessage(level, message) {
    let useNormalLogger = true;
    const msg = message.reduce((acc, item) => {
      try {
        if (typeof item === 'string') {
          return `${acc} ${item}`;
        }
        if (typeof item === 'object') {
          if (item.type !== undefined && item.type === 'audit') {
            useNormalLogger = false;
            let newStr = '';
            newStr += stringAppendForAuditLog;
            const keys = Object.keys(item);
            keys.forEach(key => {
              if (key !== 'type') {
                newStr += `${key}=${item[key]}; `;
              }
            });
            return newStr;
          }
          return `${acc} ${JSON.stringify(item)}`;
        }
        return acc;
      } catch (err) {
        return item;
      }
    }, '');

    /* logMode refers to the function we use on logger object to log specific level logs
      e.g. this.logger.debug => here debug is the logMode */
    const logModes = ['trace', 'debug', 'error', 'warn', 'info'];
    const specifiedMode = level.toLowerCase();

    /* use debug mode if specified mode doesn't match any of the known modes */
    const logMode = logModes.includes(specifiedMode) ? specifiedMode : 'debug';
    if (useNormalLogger) {
      this.normallogger[logMode](msg);
    } else {
      this.logger[logMode](msg);
    }
  }

  trace(...message) {
    this.logMessage('TRACE', message);
  }

  debug(...message) {
    this.logMessage('DEBUG', message);
  }

  warn(...message) {
    this.logMessage('WARN', message);
  }

  info(...message) {
    this.logMessage('INFO', message);
  }

  error(...message) {
    this.logMessage('ERROR', message);
  }
}
