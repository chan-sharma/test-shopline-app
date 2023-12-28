const mongoose = require('mongoose');

//create a product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    minLength: [10, 'A product should be greater than or equal to 10 chars'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  description: String,
});
const Product = mongoose.model('product', productSchema);
module.exports = Product;
