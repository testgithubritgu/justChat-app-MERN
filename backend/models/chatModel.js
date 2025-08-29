const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    members:[{type:mongoose.Schema.Types.ObjectId}],

},{timestamps:true})

module.exports = mongoose.model("chat", chatSchema)