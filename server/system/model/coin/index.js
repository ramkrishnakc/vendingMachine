import db from '../../db';
import helperFunc from '../helper';

const Lib = helperFunc(db.getModel('Coin'));

export default {
  get: Lib.find,
  getOne: Lib.findOne,
  post: Lib.create,
  delete: Lib.deleteOne,
  put: Lib.update,
};
