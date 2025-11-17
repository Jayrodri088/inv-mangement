const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Book name is required"],
    minlength: [6, "Book name must be at least 3 characters long"],
    maxlength: [100, "Book name cannot exceed 100 characters"],
  },
  countInStock: {
    type: Number,
    required: [ true, "Count in stock is required" ],
    min: [0, "Count in stock cannot be negative"],
    max: [1000, "Count in stock cannot exceed 1000"],
  },
  price: {
    type: Number,
    required: [ true, "Price is required" ],
    min: [0, "Price cannot be negative"],
    max: [10000, "Price cannot exceed 10000"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "",
    validate: {
      validator: function(v) {
        if(!v) return true; // Allow empty string
        return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`
    },
  }
});

bookSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Book", bookSchema);
