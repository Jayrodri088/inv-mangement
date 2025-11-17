const express = require("express");
const BookModel = require("../models/book.model");

const { body, validationResult, param } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  [
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
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newBook = await BookModel.create(req.body);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const bookList = await BookModel.find({});
    res.status(200).json(bookList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put(
  "/:id",
  [
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
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
