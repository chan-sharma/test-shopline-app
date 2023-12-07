const Product = require('../models/product-model');
const data = require('../utils/createOrder');
const orderCreate = require('../utils/createOrder');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const axios = require('axios');
const url =
  'https://cooltech.myshopline.com/admin/openapi/v20240301/orders.json';

let config = {
  method: 'get',
  url: url,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer' + process.env.ACCESS_TOKEN,
  },
};

//create order
exports.createOrder = async (req, res) => {
  try {
    let config1 = {
      method: 'post',
      url: url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + process.env.ACCESS_TOKEN,
      },
      data: JSON.stringify(req.body),
    };
    const createOrder = await axios(config1);

    const responseOrder = await createOrder;
    console.log(responseOrder.data);
    res.status(201).json({
      status: 'created',
      //results: products.length,
      data: { order: responseOrder.data },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
    console.log(err);
  }
};
//fetch order/

exports.getOrder = async (req, res) => {
  try {
    const createOrder = await axios(config);

    //data: orderCreate.data,

    const responseOrder = await createOrder;
    const response = responseOrder.data;
    console.log(response);
    res.status(200).json({
      status: 'Ok',
      //results: products.length,
      data: { order: response },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
    console.log(err.message);
  }
};

//const axios = require('axios');
