const fs = require('fs');
const Product = require('../models/product-model');
const ProductCreate = require('../utils/product-data');

//Route handlers
//const products = JSON.parse(
// fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//);

exports.getAllProducts = async (req, res) => {
  try {
    //Build Query
    //1 Filtering
    const queryObj = { ...req.query };
    console.log(queryObj);
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);
    console.log(queryObj);

    //2.Advanced filtering
    const query = Product.find(queryObj);
    // Execute Query

    const products = await query;

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products },
    });
  } catch (err) {
    res.status(404).json({ status: 'Not found', message: err.message });
    console.log(err.message);
  }
};
exports.getProductByID = async (req, res) => {
  try {
    const id = req.params.id;

    const productsID = await Product.findById(id);
    res.status(200).json({
      status: 'success',
      //results: products.length,
      data: productsID,
    });
  } catch (err) {
    res.status(404).json({ status: 'Not found', message: err.message });
    console.log(err);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(new ProductCreate(req));
    //console.log(newProduct);
    //body = req.body;
    res.status(201).json({
      status: 'created',
      //results: products.length,
      data: { products: newProduct },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
    console.log(err.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      //results: products.length,
      data: updateProduct,
    });
  } catch (err) {
    res.status(404).json({ status: 'Not found', message: err.message });
    console.log(err);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const updateProduct = await Product.findByIdAndDelete(id);
    //new: true,
    //runValidators: true,

    res.status(200).json({
      status: 'success',
      //results: products.length,
      data: updateProduct,
    });
  } catch (err) {
    res.status(404).json({ status: 'Not found', message: err.message });
    console.log(err);
  }
};
