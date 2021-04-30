import Model from '../../model';
import {sendSuccessResponse, sendErrorResponse} from '../helper';

const Product = Model.product;
const Coin = Model.coin;

const getProducts = (req, res) => {};

const buyProducts = (req, res) => {};

const addProduct = (req, res) => {};
const updateProduct = (req, res) => {};
const removeProduct = (req, res) => {};

/* Create new user for the application */
// const createUser = (req, res) => {
//   const {username, password, role, email} = req.body;

//   if (username && password && role && email) {
//     return User.post({
//       data: {
//         s_username: username,
//         // s_password: encrypt(password),
//         s_role: role,
//         s_email: email,
//       },
//     })
//       .then(() =>
//         sendSuccessResponse(
//           res,
//           '',
//           `User: ${username} with role: ${role} is successfully created`
//         )
//       )
//       .catch((err) => sendErrorResponse({res, logMsg: err}));
//   }
//   return sendErrorResponse({
//     res,
//     code: 400,
//     message: 'Bad Parameters',
//     logMsg: 'Missing username or password or role in paylaod',
//   });
// };

export default {
  getProducts,
  buyProducts,
  addProduct,
  updateProduct,
  removeProduct,
};
