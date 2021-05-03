import {expect} from 'chai';
import {pick, sortBy} from 'lodash';

import productsJson from '../static/data/products.json';

describe('Starting MongoDB CRUD wrapper test.', () => {
  describe('Testing Product.deleteMany', () => {
    it('it should empty all the products from DB for test', async () => {
      try {
        // eslint-disable-next-line global-require
        const Product = require('../server/system/model/product').default;
        await Product.deleteMany({data: {}});

        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });

  describe('Testing Product.postMany', () => {
    it('it should add all the products to DB', async () => {
      try {
        // eslint-disable-next-line global-require
        const Product = require('../server/system/model/product').default;
        await Product.postMany({data: productsJson});

        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });

  describe('Testing Product.get', () => {
    it('it should get all the products from DB', async () => {
      try {
        // eslint-disable-next-line global-require
        const Product = require('../server/system/model/product').default;
        const products = await Product.get({
          query: {},
          select: {
            product_id: 1,
            product_name: 1,
            product_rate: 1,
            product_stock: 1,
            product_image: 1,
          },
          sort: {product_name: 1},
        });

        expect(products).to.be.an('array');
        expect(products).to.have.lengthOf(3);
        const existingData = sortBy(productsJson, ['product_name']);
        const resData = products.map(prod =>
          pick(prod, [
            'product_id',
            'product_name',
            'product_rate',
            'product_stock',
            'product_image',
          ])
        );

        expect(resData).to.deep.equal(existingData); // product needs to be same as initial json data

        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });

  describe('Testing Product.getOne', () => {
    it('it should get a single product data from DB', async () => {
      try {
        // eslint-disable-next-line global-require
        const Product = require('../server/system/model/product').default;
        const product = await Product.getOne({query: {product_name: 'Coke'}});

        expect(product.product_id).to.be.equal('PROD-003');
        expect(product.product_name).to.be.equal('Coke');
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });
});
