import {get} from 'lodash';

import Model from '../../model';
import {sendSuccessResponse, sendErrorResponse} from '../helper';

const Coin = Model.coin;
const Product = Model.product;
const Purchase = Model.purchase;

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
    const purchases = await Purchase.get({
      query: {},
      select: {
        purchase_date: 1,
        purchase_amount: 1,
        purchase_array: 1,
      },
      sort: {purchase_date: -1},
    });

    return sendSuccessResponse(res, {
      coins: get(coins, 'coin_available'),
      products,
      purchases,
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
    const purchaseData = {
      purchase_amount: products.reduce(
        (acc, cur) => acc + cur.product_rate * cur.product_quantity,
        0
      ),
      purchase_array: products.map(prod => ({
        product_name: prod.product_name,
        product_rate: prod.product_rate,
        product_quantity: prod.product_quantity,
        refund_quantity: 0,
      })),
    };

    await Purchase.post({data: purchaseData});
    await Coin.put({query: {v_id: 'VENDOR-01'}, data: {coin_available: coins}});
    await Promise.all(
      products.map(prod =>
        Product.put({
          query: {product_id: prod.product_id},
          data: {product_stock: prod.product_stock},
        })
      )
    );

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

/* Handle item returns by updating available coins, product stock & refund info */
const refundItems = async (req, res) => {
  try {
    const {coins, refundData, products} = req.body;

    await Coin.put({query: {v_id: 'VENDOR-01'}, data: {coin_available: coins}});
    await Promise.all(
      refundData.map(ele =>
        Purchase.put({
          query: {'purchase_array._id': ele._id},
          data: {
            $set: {
              'purchase_array.$.refund_quantity': ele.refund_quantity,
              'purchase_array.$.refund_date': new Date().toISOString(),
            },
          },
        })
      )
    );
    await Promise.all(
      products.map(prod =>
        Product.put({
          query: {product_name: prod.product_name},
          data: {$inc: {product_stock: prod.product_stock}},
        })
      )
    );

    return sendSuccessResponse(
      res,
      null,
      `Refund was Successful - total coins:${coins}`
    );
  } catch (err) {
    return sendErrorResponse({
      res,
      message: 'Could not proceed with refunding items',
      logMsg: err,
    });
  }
};

export default {
  getProducts,
  buyProducts,
  refundItems,
};
