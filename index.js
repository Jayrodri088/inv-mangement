const express = require("express");
const i18next = require("i18next");
const backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const booksRouter = require("./routes/books.routes");

const port = process.env.PORT;

i18next.use(backend).use(middleware.LanguageDetector).init({
  fallbackLng: "en",
  backend: {
    loadPath: "./locales/{{lng}}.json",
  }
})

app.use(middleware.handle(i18next));
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
