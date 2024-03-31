const Factory = require("./handlersFactory");
const subCategoryModel = require("../moduls/subCategoryModel");

// Nested route (create)
exports.setCategoryIdtoBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route (get)
//GET /api/v1/categories/:categoryId/subCategories
exports.createFilterObject = (req, res, next) => {
  let filltterObject = {};
  if (req.params.categoryId)
    filltterObject = { category: req.params.categoryId };
  req.filterObj = filltterObject;
  next();
};

// @desc get list of  SubCategory
// @route GET /api/v1/SubCategory
// @access Public
exports.getSubCategories = Factory.getAll(subCategoryModel);

// @desc Get specific SubCategory by id
// @route GET /api/v1/SubCategory/:id
// @access public
exports.getSubCategory = Factory.getOne(subCategoryModel);

// @desc Create SubCategory
// @route POST /api/v1/SubCategory
// @access Private
exports.createsubCategory = Factory.create(subCategoryModel);

// @desc Update specific SubCategory
// @route PUT /api/v1/SubCategory
// @access Private
exports.updateSubCategory = Factory.update(subCategoryModel);

// @desc Delete specific SubCategory
// @route DELETE /api/v1/SubCategory
// @access Private
exports.deleteSubCategory = Factory.delete(subCategoryModel);
