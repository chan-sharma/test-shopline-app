const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

//query param validator
router.param('id', productController.checkID);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.checkBody, productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductByID)
  .post(productController.checkBody, productController.createProduct);

module.exports = router;
