export default {
  v_id: {type: String, required: true, unique: true},
  coin_available: {type: Number, default: 10, required: true},
};
