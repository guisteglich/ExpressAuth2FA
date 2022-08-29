
const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/auth"

mongoose.connect(MONGO_URI,
 { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("connected successfully to db")
 }).catch((err) => {
    console.log("Error to connect "+err)
 })

module.exports = mongoose