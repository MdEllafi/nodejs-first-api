const Factory = require("./handlersFactory");
const CategoryModel = require("../moduls/categoryModel");

// @desc get list of Category
// @route GET /api/v1/categories
// @access Public
exports.getCategories = Factory.getAll(CategoryModel);

// @desc Get specific category by id
// @route GET /api/v1/categories/:id
// @access public
exports.getCategory = Factory.getOne(CategoryModel);

// @desc Create Category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = Factory.create(CategoryModel);

// @desc Update specific Category
// @route PUT /api/v1/categories
// @access Private
exports.updateCategory = Factory.update(CategoryModel);

// @desc Delete specific Category
// @route DELETE /api/v1/categories
// @access Private
exports.deleteCategory = Factory.delete(CategoryModel);
