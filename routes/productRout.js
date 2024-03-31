const express = require("express");
const {
  getProducValidator,
  createProductValidator,
  UpdateProducValidator,
  deleteProducValidator,
} = require("../utils/validators/productValidator");

const {
  getProudcts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

const router = express.Router();

router.route("/").get(getProudcts).post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProducValidator, getProduct)
  .put(UpdateProducValidator, updateProduct)
  .delete(deleteProducValidator, deleteProduct);
module.exports = router;
