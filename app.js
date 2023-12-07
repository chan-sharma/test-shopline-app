const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoute');
const { PromiseProvider } = require('mongoose');

//1. Middleware
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//routing

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
// start server
module.exports = app;
