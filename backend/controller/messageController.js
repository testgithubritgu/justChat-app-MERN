const messageModel = require("../models/messageModel")

//create message
const createMsg = async(req,res) =>{
    const {chatId,senderId,text}= req.body
    const msg = new messageModel({
        chatId,
        senderId,
        text
    })
    try {
        const response = await msg.save()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

const getMessages = async (req,res)=>{
    const {chatId} = req.params 
    try {
        const message = await messageModel.find({chatId})
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

module.exports = { createMsg, getMessages } 