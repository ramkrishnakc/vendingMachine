export default {
  product_name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  product_price: {type: Number, required: true},
  product_stock: {type: Number, required: true},
  product_added: {
    type: String,
    default: new Date().toISOString(),
  },
  product_image: {type: String},
};
