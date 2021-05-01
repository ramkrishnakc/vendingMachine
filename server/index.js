import express from 'express';
import http from 'http';
import spdy from 'spdy';
import fs from 'fs';

import createDB, {insertInitialData} from './system';
import config from './config';
import {mkDirByPathSync} from './controller/helper';

const {
  logger,
  app: {certDirectory, uploadPaths},
} = config;
const env = process.env.NODE_ENV || 'development';
const serverConfig = config.server[env];
const {httpPort, httpsPort, ip} = serverConfig;

logger.info('process.env.NODE_ENV ::: ', process.env.NODE_ENV);

const app = express();

// For 'development' mode
if (env === 'development') {
  const useDevServer = require('./dev-server').default; // eslint-disable-line global-require
  useDevServer(app);
}

/* Handle the logs for server status */
const handleServerStatusLog = (serverType, port, err) => {
  if (err) {
    logger.error(`Could not start ${serverType} Server in port ${port}`);
    logger.trace(err.stack);
    return process.exit(1);
  }
  return logger.info(
    `${serverType} Server started successfully at ${serverType.toLowerCase()}://${ip}:${port}`
  );
};

const createHTTPServer = () =>
  http
    .Server(app)
    .listen(httpPort, ip, err => handleServerStatusLog('HTTP', httpPort, err));

const createHTTPsServer = () =>
  spdy
    .createServer(
      {
        key: fs.readFileSync(`${certDirectory}/ssl.key`),
        cert: fs.readFileSync(`${certDirectory}/ssl.crt`),
      },
      app
    )
    .listen(httpsPort, ip, err =>
      handleServerStatusLog('HTTPS', httpsPort, err)
    );

const SERVER = {
  start: () => {
    config.express(app, config.app); // Configure express server

    const routes = require('./routes').default; // eslint-disable-line global-require
    routes(app); // Configure routes

    uploadPaths.forEach(uploadPath => mkDirByPathSync(uploadPath)); // create file upload paths if needed
    createHTTPServer(); // start HTTP server
    createHTTPsServer(); // Finally start HTTPS server
  },
};

// Initialize Database then start the server
createDB()
  .then(() => SERVER.start())
  .then(() => insertInitialData())
  .catch(e => {
    logger.error('Error while starting the Application....');
    logger.trace(e.stack);
  });
