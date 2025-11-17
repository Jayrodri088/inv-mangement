const { body, validationResult, param } = require("express-validator");

const createBookValidator = [
  body("bookName")
    .notEmpty()
    .withMessage("Book name is required")
    .isLength({ min: 6, max: 100 })
    .withMessage("Book name must be between 6 and 100 characters"),
  body("countInStock")
    .notEmpty()
    .withMessage("Count in stock is required")
    .isInt({ min: 0, max: 1000 })
    .withMessage("Count in stock must be between 0 and 1000"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0, max: 10000 })
    .withMessage("Price must be between 0 and 10000$"),
  body("image").optional().isURL().withMessage("Image must be a valid URL"),
];

const updateBookValidator = [
  param("id").isMongoId().withMessage("Invalid book ID"),
  body("bookName")
    .optional()
    .isLength({ min: 6, max: 100 })
    .withMessage("Book name must be between 6 and 100 characters"),
  body("countInStock")
    .optional()
    .isInt({ min: 0, max: 1000 })
    .withMessage("Count in stock must be between 0 and 1000"),
  body("price")
    .optional()
    .isFloat({ min: 0, max: 10000 })
    .withMessage("Price must be between 0 and 10000$"),
  body("image").optional().isURL().withMessage("Image must be a valid URL"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createBookValidator,
  updateBookValidator,
  handleValidationErrors,
};
