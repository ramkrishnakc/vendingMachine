import express from 'express';
import product from './product.controller';

const router = express.Router();
router.get('/', product.getProducts);
router.post('/checkout', product.buyProducts);

export default router;
