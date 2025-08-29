const mongoose = require("mongoose")

exports.connectDb = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/justChat")
        console.log("db connected 😎")
    } catch (error) {
        console.log("DB connection problem 😥")
    }
}