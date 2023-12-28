const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoute');
const ApiError = require('./utils/apiError');
const globalErrorHandler = require('./controllers/errorController');

//1. Middleware
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//routing

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
// handle all invalid requests and routes
app.all('*', (req, res, next) => {
  //const err = new Error(`cant find ${req.originalUrl} on this server`);
  //err.status = 'fail';
  //err.statusCode = 404;
  //another way of handling error using ApiError Class instead
  next(new ApiError(`cant find ${req.originalUrl} on this server`, 404));
});
// global error handler using next middleware
app.use(globalErrorHandler);

module.exports = app;
