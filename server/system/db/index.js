import config from '../../config';
import Database from './db';
import dbConfig from './db_config';

require('../global');

const {
  logger,
  app: {dbName},
} = config;

/* Create Database Instance */
const create = () =>
  new Promise((resolve, reject) => {
    const db = new Database(dbConfig.db.find(o => o.name === dbName));
    // Push DB instance to global variable
    global.appObjectStore.db.push({name: dbName, db});

    db.connect()
      .then(() => {
        logger.info(`Database ${dbName} is up & running...!!`);
        return db
          .loadSchema()
          .then(() => {
            logger.info('Schemas loaded successfully');
            return resolve();
          })
          .catch(err => {
            logger.error('Failed to load mongoose schema');
            logger.trace(err.stack);
            return reject(err);
          });
      })
      .catch(err => {
        logger.error('Database connection error..');
        logger.trace(err.stack);
        return reject(err);
      });
  });

/* Call this to get DB model */
const getModel = name => {
  const {db} = global.appObjectStore.db.find(o => o.name === dbName);
  return db.schemas.find(o => o.modelName === name).model;
};

export default {
  create,
  getModel,
};
