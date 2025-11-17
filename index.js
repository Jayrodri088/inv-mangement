const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()

app.use(express.json())

const port = process.env.PORT

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    }
})
BookModel = mongoose.model("Book", bookSchema)


app.post("/books", async (req, res) => {
    const newBook = await BookModel.create(req.body)
    res.status(201).json(newBook)
})

app.get("/books", async (req, res) => {
    const bookList = await BookModel.find({})
    res.status(200).json(bookList)
})

app.listen(port, () => {
    console.log("App listening on port 3000")
})



const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err)
    })