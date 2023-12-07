const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

//query param validator
//router.param('id', productController.checkID);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductByID)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
