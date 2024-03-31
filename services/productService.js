const Factory = require("./handlersFactory");
const productModel = require("../moduls/productModel");

// @desc get list of Product
// @route GET /api/v1/proudcts
// @access Public
exports.getProudcts = Factory.getAll(productModel, "Product");

// @desc Get specific Product by id
// @route GET /api/v1/Proudcts/:id
// @access public
exports.getProduct = Factory.getOne(productModel);

// @desc Create Product
// @route POST /api/v1/Proudcts
// @access Private
exports.createProduct = Factory.create(productModel);

// @desc Update specific Product
// @route PUT /api/v1/Proudcts
// @access Private
exports.updateProduct = Factory.update(productModel);

// @desc Delet e specific Product
// @route DELETE /api/v1/Proudcts
// @access Private
exports.deleteProduct = Factory.delete(productModel);
