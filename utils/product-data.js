const app = require('../app.js');
//onst request = req.body
class ProductCreate {
  constructor(req) {
    this.name = req.body.name;
    this.price = req.body.price;
    this.description = req.body.description;
  }
}
module.exports = ProductCreate;
