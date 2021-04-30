import express from 'express';
import ejs from 'ejs';
import cors from 'cors';
import helmet from 'helmet';

const expressConfig = (app, config) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.urlencoded({extended: true, limit: '10mb'}));
  app.use(express.json({limit: '10mb'}));
  app.use(express.static(config.publicPath));
  app.set('views', config.publicPath);
  app.set('html', ejs.renderFile);
  app.set('view engine', 'html');
};

export default expressConfig;
