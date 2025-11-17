const { body, validationResult, param } = require("express-validator");

const createBookValidator = [
  body("bookName")
    .notEmpty()
    .withMessage((value, { req }) => req.t("bookNameRequired"))
    .isLength({ min: 6, max: 100 })
    .withMessage((value, { req }) => req.t("bookNameLength")),
  body("countInStock")
    .notEmpty()
    .withMessage((value, { req }) => req.t("countInStockRequired"))
    .isInt({ min: 0, max: 1000 })
    .withMessage((value, { req }) => req.t("countInStockRange")),
  body("price")
    .notEmpty()
    .withMessage((value, { req }) => req.t("priceRequired"))
    .isFloat({ min: 0, max: 10000 })
    .withMessage((value, { req }) => req.t("priceRange")),
  body("image")
    .optional()
    .isURL()
    .withMessage((value, { req }) => req.t("imageInvalidUrl")),
];

const updateBookValidator = [
  body("bookName")
    .optional()
    .isLength({ min: 6, max: 100 })
    .withMessage((value, { req }) => req.t("bookNameLength")),
  body("countInStock")
    .optional()
    .isInt({ min: 0, max: 1000 })
    .withMessage((value, { req }) => req.t("countInStockRange")),
  body("price")
    .optional()
    .isFloat({ min: 0, max: 10000 })
    .withMessage((value, { req }) => req.t("priceRange")),
  body("image")
    .optional()
    .isURL()
    .withMessage((value, { req }) => req.t("imageInvalidUrl")),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const idValidation = [
  param("id")
    .isMongoId()
    .withMessage((value, { req }) => req.t("invalidBookId")),
];

module.exports = {
  createBookValidator,
  updateBookValidator,
  handleValidationErrors,
  idValidation,
};
