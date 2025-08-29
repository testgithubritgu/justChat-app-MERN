const chatModel = require("../models/chatModel")

const createChat = async (req ,res)=>{
    
    try {
        const { firstId, secondId } = req.body 
        const chat  = await chatModel.findOne({
            members:{$all:[firstId,secondId]}
        })
        if (chat){ return res.status(200).json({chat})}
        const newChat = await chatModel.create({
    members:[firstId,secondId]
})

        res.status(200).json(newChat)
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}


const findUserChats = async (req,res) =>{
     const userId = req.params.userId 
     try {
        const chats = await chatModel.find({
            members:{$in:[userId]}
        })
        res.status(200).json({message:"chats ",chats})
     } catch (error) {
        res.status(500).json({err:error.message})
     }
}

module.exports = {createChat,findUserChats}
