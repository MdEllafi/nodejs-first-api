const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddlewares");
const Category = require("../../moduls/categoryModel");
const subCategory = require("../../moduls/subCategoryModel");
const slugify = require("slugify");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product required")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product Sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product price after discount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("price After discount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be array of string"),
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be an array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),
  check("subcategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subcategoryId) =>
      subCategory
        .find({ _id: { $exists: true, $in: subcategoryId } })
        .then((result) => {
          if (result.length < 1 || result.length != subcategoryId.length) {
            return Promise.reject(new Error(`Invalid subcategory Ids`));
          }
        })
    )
    .custom((val, { req }) =>
      subCategory.find({ category: req.body.category }).then((subCategory) => {
        const subcategoriesIds = [];
        subCategory.forEach((subCategory) => {
          subcategoriesIds.push(subCategory._id.toString());
        });
        if (!val.every((v) => subcategoriesIds.includes(v))) {
          return Promise.reject(
            new Error(`subcategory not belong to category`)
          );
        }
      })
    ),
  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ max: 1 })
    .withMessage("Rating must be abobe or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("retingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("retingsQuantity must be a number"),
  validatorMiddleware,
];

exports.getProducValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];

exports.UpdateProducValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteProducValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];
