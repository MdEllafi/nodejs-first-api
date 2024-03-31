const express = require("express");

const {
  createsubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdtoBody,
  createFilterObject,
} = require("../services/subCategoryService");
const {
  createsubCategoryValidator,
  getsubCategoryValidator,
  updatesubCategoryValidator,
  deletesubCategoryValidator,
} = require("../utils/validators/subcategoryValidator");

// mergeParams: Allow us to access parameters on other routers
// ex: we need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdtoBody, createsubCategoryValidator, createsubCategory)
  .get(createFilterObject, getSubCategories);
router
  .route("/:id")
  .get(getsubCategoryValidator, getSubCategory)
  .put(updatesubCategoryValidator, updateSubCategory)
  .delete(deletesubCategoryValidator, deleteSubCategory);

module.exports = router;
