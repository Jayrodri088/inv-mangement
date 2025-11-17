const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const booksRouter = require("./routes/books.routes");

const port = process.env.PORT;

app.use(express.json());
app.use("/books", booksRouter);

app.listen(port, () => {
  console.log("App listening on port 3000");
});

const connectionString = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
