const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello there!")
})

app.get("/inventory", (req, res) => {
    res.send("Inventory List")
})

app.get("/about", (req, res) => {
    res.send("About Inventory Management App")
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