const fs = require('fs');
const Product = require('../models/product-model');
const ProductCreate = require('../utils/product-data');
const { match } = require('assert');

//Route handlers
//const products = JSON.parse(
// fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//);

exports.getAllProducts = async (req, res) => {
  try {
    //Build Query
    //1 Filtering
    const queryObj = { ...req.query };
    //console.log(queryObj);
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);
    //console.log(queryObj);

    //2.Advanced filtering
    let qrystr = JSON.stringify(queryObj);
    qrystr = qrystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //console.log(JSON.parse(qrystr));
    let query = Product.find(JSON.parse(qrystr));
    //console.log(JSON.parse(query));
    // 3. sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');

      query = query.sort(sortBy);
      //default sort
    } else {
      query = query.sort('-createdAt');
    }
    // 4. Filed limiting response
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else query = query.select('-__v');

    //5. Paginaton
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numPrd = await Product.countDocuments();
      if (skip > numPrd) throw new Error('page not found');
    }

    // Execute Query

    const products = await query;
    if (products.length > 0) {
      res.status(200).json({
        status: 'success',
        results: products.length,
        data: { products },
      });
    } else {
      throw new Error('does not exist');
    }
    //2 Advanced sorting
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
