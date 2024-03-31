const Factory = require("./handlersFactory");
const brandModel = require("../moduls/brandModel");

// @desc get list of brand
// @route GET /api/v1/brands
// @access Public
exports.getBrands = Factory.getAll(brandModel);

// @desc Get specific brand by id
// @route GET /api/v1/brands/:id
// @access public
exports.getBrand = Factory.getOne(brandModel);

// @desc Create brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = Factory.create(brandModel);

// @desc Update specific brand
// @route PUT /api/v1/brands
// @access Private
exports.updateBrand = Factory.update(brandModel);

// @desc Delete specific brand
// @route DELETE /api/v1/brands
// @access Private
exports.deleteBrand = Factory.delete(brandModel);
