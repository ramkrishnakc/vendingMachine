export default {
  purchase_amount: {type: Number, required: true},
  purchase_date: {type: String, default: new Date().toISOString()},
  purchase_array: [
    {
      product_name: {type: String, required: true},
      product_rate: {type: Number, required: true},
      product_quantity: {type: Number, required: true},
      refund_quantity: {type: Number, required: true},
      refund_date: {type: String},
    },
  ],
};
