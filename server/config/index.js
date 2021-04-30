import app from './app';
import express from './express_config';
import LoggerClass from './logger';
import server from './server';

const logger = new LoggerClass({logDirectory: app.logDirectory});

export default {
  app,
  express,
  logger,
  server,
};
