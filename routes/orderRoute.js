const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

//query param validator
//router.param('id', productController.checkID);

router
  .route('/')
  .get(orderController.getOrder)
  .post(orderController.createOrder);
/*()
router
  .route('/:id')
  .get(productController.getProductByID)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);
*/
module.exports = router;
