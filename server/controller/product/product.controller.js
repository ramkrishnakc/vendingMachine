import {get} from 'lodash';

import Model from '../../model';
import {sendSuccessResponse, sendErrorResponse} from '../helper';

const Product = Model.product;
const Coin = Model.coin;

/* Get coins and list of products to display */
const getProducts = async (req, res) => {
  try {
    const coins = await Coin.getOne({query: {v_id: 'VENDOR-01'}});
    const products = await Product.get({
      query: {},
      select: {
        product_id: 1,
        product_image: 1,
        product_name: 1,
        product_rate: 1,
        product_stock: 1,
      },
      sort: {product_name: 1},
    });

    return sendSuccessResponse(res, {
      coins: get(coins, 'coin_available'),
      products,
    });
  } catch (err) {
    return sendErrorResponse({
      res,
      message: 'Could not get list of products',
      logMsg: err,
    });
  }
};

/* Handle purchase of products by updating product stock and coins */
const buyProducts = async (req, res) => {
  try {
    const {coins, products} = req.body;
    const promises = [
      Coin.put({query: {v_id: 'VENDOR-01'}, data: {coin_available: coins}}),
      ...products.map(prod =>
        Product.put({
          query: {product_id: prod.product_id},
          data: {product_stock: prod.product_stock},
        })
      ),
    ];

    await Promise.all(promises);

    return sendSuccessResponse(
      res,
      null,
      `Purchase was Successful - total coins:${coins}`
    );
  } catch (err) {
    return sendErrorResponse({
      res,
      message: 'Could not proceed with buying products',
      logMsg: err,
    });
  }
};

export default {
  getProducts,
  buyProducts,
};
