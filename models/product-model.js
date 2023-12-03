const mongoose = require('mongoose');

//create a product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  description: String,
});
const Product = mongoose.model('product', productSchema);
module.exports = Product;
