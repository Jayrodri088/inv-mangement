const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

bookSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Book", bookSchema);
