const express =  require("express")
const cors = require("cors")
const app = express()
app.use(cors())

const http = require("http").Server(app)
const path = require("path")
//middelware 
app.use(express.json())

//routes import
const chatRoute = require("./route/chatRoute")
const authRoute = require("./route/AuthRoute")


const { sourceMapsEnabled } = require("process")
const { connectDb } = require("./db/db")
const io = require("socket.io")(http,{
    cors:{
        origin:"*"
    }
})

//api for chats
app.use("/api/chats",chatRoute)

//api for user auth
app.use("/api/auth", authRoute)




connectDb().then(()=>{

    http.listen(3001,()=>{
        console.log('Server runnin on 3001')
    })
})



//yaha se jo user already connected hai unke liye msg send hoga
//show new users msg like welcome and old users show total users