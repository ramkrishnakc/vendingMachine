import db from './db';

require('./global');

/* Create the database */
const createDB = () =>
  new Promise((resolve, reject) =>
    db
      .create()
      .then(() => resolve())
      .catch((e) => reject(e))
  );
export default createDB;
