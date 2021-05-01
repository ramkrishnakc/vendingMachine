import db from './db';
import config from '../config';
import products from '../../static/data/products.json';
import coin from '../../static/data/coin.json';

require('./global');

const {logger} = config;

/* For inserting products & coins initially in DB */
export const insertInitialData = async () => {
  try {
    const Product = require('./model/product').default; // eslint-disable-line global-require
    const Coin = require('./model/coin').default; // eslint-disable-line global-require

    const Promises = [
      Product.postMany({data: products}),
      Coin.post({data: coin}),
      // ...products.map(item => Product.post({data: item})),
    ];

    logger.info('Inserting products & coins in DB initially.');
    await Promise.all(Promises);
    logger.info('Initial import successful!!');
  } catch (err) {
    // Duplicate key i.e. item already exist
    if (err.code === 11000) {
      logger.info('Initial import was already done, no need to do it again.');
      return;
    }
    logger.error('Error occurred while adding initial data in DB');
    logger.error(err.stack);
  }
};

/* Create the database */
const createDB = () =>
  new Promise((resolve, reject) =>
    db
      .create()
      .then(() => resolve())
      .catch(e => reject(e))
  );
export default createDB;
