const express = require("express");
const BookModel = require("../models/book.model");
const {
  createBookValidator,
  updateBookValidator,
  handleValidationErrors,
  idValidation,
} = require("../validators/book.validator");

const { param } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  createBookValidator,
  handleValidationErrors,
  async (req, res) => {
    try {
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

router.get("/:id", idValidation, handleValidationErrors, async (req, res) => {
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

router.delete(
  "/:id",
  idValidation,
  handleValidationErrors,
  async (req, res) => {
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
  }
);

router.put(
  "/:id",
  idValidation,
  updateBookValidator,
  handleValidationErrors,
  async (req, res) => {
    try {
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
