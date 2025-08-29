const mongoose = require("mongoose")


const newUser = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "sub_admin", "user"] ,default:"user"},
    address:String,
    phone: String,
},{timestamps:true})

module.exports = mongoose.model("user",newUser)

