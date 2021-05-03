import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {omit, sortBy, get} from 'lodash';

import startServer from '../server';
import productsJson from '../static/data/products.json';

chai.use(chaiHttp);

const baseApi = 'http://localhost:8005';
const purchaseData = {
  coins: 100 + 2 * 20 + 3 * 30 + 4 * 25, // Total no. of coins after purchase
  products: [
    {
      product_id: 'PROD-003',
      product_name: 'Coke',
      product_rate: 20,
      product_quantity: 2,
      product_stock: 8,
    },
    {
      product_id: 'PROD-002',
      product_name: 'Dew',
      product_rate: 30,
      product_quantity: 3,
      product_stock: 7,
    },
    {
      product_id: 'PROD-001',
      product_name: 'Pepsi',
      product_rate: 25,
      product_quantity: 4,
      product_stock: 6,
    },
  ],
};

let httpInstance;

describe('Starting API test..', () => {
  before(done => {
    startServer()
      .then(res => {
        if (res.status !== 'server_started') {
          throw new Error('Could not start server before running test');
        }
        ({httpInstance} = res);
        // eslint-disable-next-line promise/no-callback-in-promise
        return done();
      })
      .catch(err => {
        throw err;
      });
  });

  describe('Testing DB removal', () => {
    it('it should remove all the products, purchases and coins from DB', async () => {
      try {
        const Product = require('../server/system/model/product').default; // eslint-disable-line global-require
        const Coin = require('../server/system/model/coin').default; // eslint-disable-line global-require
        const Purchase = require('../server/system/model/purchase').default; // eslint-disable-line global-require

        await Product.deleteMany({query: {}}); // Empty products
        await Coin.deleteMany({query: {}}); // Empty coins
        await Purchase.deleteMany({query: {}}); // Empty coins

        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });

  describe('Testing `insertInitialData` function that inserts products and coins to DB', () => {
    it('it should insert the products and coins to DB', async () => {
      try {
        const {insertInitialData} = require('../server/system'); // eslint-disable-line global-require

        await insertInitialData(); // initial insertion function called

        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });

  describe('Testing GET /vendorapi/products API - Checking initially inserted products and coin', () => {
    it('it should GET all the products, purchases and coins', async () => {
      try {
        const res = await chai.request(baseApi).get('/vendorapi/products');

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.own.property('success');
        expect(res.body.success).to.be.equal(true);
        expect(res.body).to.have.own.property('data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.own.property('coins');
        expect(res.body.data.coins).to.be.equal(100); // coin 100 initially
        expect(res.body.data).to.have.own.property('products');
        expect(res.body.data.products).to.be.an('array');
        expect(res.body.data.products).to.have.lengthOf(3);

        const existingData = sortBy(productsJson, ['product_name']);
        const resData = res.body.data.products.map(prod =>
          omit(prod, ['_id', 'product_added'])
        );
        expect(resData).to.deep.equal(existingData); // product needs to be same as initial json data

        expect(res.body.data).to.have.own.property('purchases');
        expect(res.body.data.purchases).to.be.an('array');
        expect(res.body.data.purchases).to.have.lengthOf(0);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });

  describe('Testing POST /vendorapi/products/checkout API - Test for purchase', () => {
    it(`it should handle purchase of 2 coke, 3 dew & 4 pepsi properly -
        product stock, coins should be updated and purchase detail should be added`, async () => {
      try {
        const res = await chai
          .request(baseApi)
          .post('/vendorapi/products/checkout')
          .send(purchaseData);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.own.property('success');
        expect(res.body.success).to.be.equal(true);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });

  describe('Testing POST /vendorapi/products/refund API - Test for refund', () => {
    it(`it should handle refund of 1 coke & 2 pepsi properly -
        product stock, coins and purchase details should be updated`, async () => {
      try {
        // First Get the data to find id
        const res = await chai.request(baseApi).get('/vendorapi/products');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.own.property('purchases');
        expect(res.body.data.purchases).to.be.an('array');

        const refundData = [];

        get(res, 'body.data.purchases[0]purchase_array', []).forEach(item => {
          const obj = {_id: item._id, refund_rate: item.product_rate};

          if (item.product_name === 'Coke') {
            obj.refund_quantity = 1;
            refundData.push(obj);
          }
          if (item.product_name === 'Pepsi') {
            obj.refund_quantity = 2;
            refundData.push(obj);
          }
        });
        const returnPayload = {
          coins: 330 - 1 * 20 - 2 * 25, // Total no. of coins after re-fund
          products: [
            {product_name: 'Coke', product_stock: 1},
            {product_name: 'Pepsi', product_stock: 2},
          ],
          refundData,
        };

        const resp = await chai
          .request(baseApi)
          .post('/vendorapi/products/refund')
          .send(returnPayload);

        expect(resp).to.have.status(200);
        expect(resp.body).to.be.an('object');
        expect(resp.body).to.have.own.property('success');
        expect(resp.body.success).to.be.equal(true);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });

  describe('Finally verifying DB data after purchase and refund', () => {
    it(`Product stock, coins and purchase details should be in proper state`, async () => {
      try {
        const res = await chai.request(baseApi).get('/vendorapi/products');

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.own.property('success');
        expect(res.body.success).to.be.equal(true);
        expect(res.body).to.have.own.property('data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.own.property('coins');
        // Ensure coins value is updated
        expect(res.body.data.coins).to.be.equal(260); // coin 260 after purchase and refund (i.e. 330 - 70)
        expect(res.body.data).to.have.own.property('products');
        expect(res.body.data.products).to.be.an('array');
        expect(res.body.data.products).to.have.lengthOf(3);

        const cokeItem = res.body.data.products.find(
          d => d.product_name === 'Coke'
        );
        const dewItem = res.body.data.products.find(
          d => d.product_name === 'Dew'
        );
        const pepsiItem = res.body.data.products.find(
          d => d.product_name === 'Pepsi'
        );

        // Ensure that product stock is updated
        expect(cokeItem).to.be.an('object');
        expect(cokeItem.product_stock).to.be.equal(9);
        expect(dewItem).to.be.an('object');
        expect(dewItem.product_stock).to.be.equal(7);
        expect(pepsiItem).to.be.an('object');
        expect(pepsiItem.product_stock).to.be.equal(8);

        expect(res.body.data).to.have.own.property('purchases');
        expect(res.body.data.purchases).to.be.an('array');
        expect(res.body.data.purchases).to.have.lengthOf(1);

        const purchaseArray = get(
          res,
          'body.data.purchases[0].purchase_array',
          []
        );
        expect(purchaseArray).to.have.lengthOf(3);

        const cokeObj = purchaseArray.find(d => d.product_name === 'Coke');
        const dewObj = purchaseArray.find(d => d.product_name === 'Dew');
        const pepsiObj = purchaseArray.find(d => d.product_name === 'Pepsi');

        // Ensure that Refunded quantity is updated
        expect(cokeObj).to.be.an('object');
        expect(cokeObj.refund_quantity).to.be.equal(1); // 1 coke returned
        expect(cokeObj.product_quantity).to.be.equal(2); // 2 coke purchased

        expect(dewObj).to.be.an('object');
        expect(dewObj.refund_quantity).to.be.equal(0); // 0 dew returned
        expect(dewObj.product_quantity).to.be.equal(3); // 3 dew purchased

        expect(pepsiObj).to.be.an('object');
        expect(pepsiObj.refund_quantity).to.be.equal(2); // 2 pepsi returned
        expect(pepsiObj.product_quantity).to.be.equal(4); // 4 pepsi purchased

        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });

  after(async () => {
    try {
      httpInstance.close();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
});
