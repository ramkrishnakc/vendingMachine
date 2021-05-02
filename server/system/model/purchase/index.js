import db from '../../db';
import helperFunc from '../helper';

const Lib = helperFunc(db.getModel('Purchase'));

export default {
  get: Lib.find,
  getOne: Lib.findOne,
  post: Lib.create,
  postMany: Lib.insertMany,
  delete: Lib.deleteOne,
  put: Lib.update,
};
