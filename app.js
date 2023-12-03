const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes');

//1. Middleware
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//routing

app.use('/api/v1/products', productRouter);
// start server
module.exports = app;
