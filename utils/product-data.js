const app = require('../app.js');
//onst request = req.body
class ProductCreate {
  constructor(req) {
    this.name = req.name;
    this.price = req.price;
    this.description = req.description;
  }
}

module.exports = ProductCreate;
7;
