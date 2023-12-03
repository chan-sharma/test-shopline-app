const fs = require('fs');
const Product = require('../models/product-model');

//Route handlers
//const products = JSON.parse(
// fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//);
exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > products.length)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  next();
};

exports.checkBody = (req, res, next) => {
  //console.log(req.body);
  if (!req.body.name) {
    return res
      .status(422)
      .json({ status: 'fail', message: ` missing name field}` });
  }
  next();
};

exports.getAllProducts = (req, res) => {
  res.status(201).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
};
exports.getProductByID = (req, res) => {
  const id = req.params.id * 1;

  const productsID = products.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    //results: products.length,
    data: productsID,
  });
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
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
