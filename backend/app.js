const express =  require("express")
const cors = require("cors")
const app = express()
app.use(cors())
const http = require("http").Server(app)
const path = require("path")
const { sourceMapsEnabled } = require("process")
const io = require("socket.io")(http,{
    cors:{
        origin:"*"
    }
})
app.get("/",(req,res)=>{
   res.sendFile(path.join(__dirname,"index.html"))
})




io.on("connection",(socket)=>{
    console.log('client is connected')
    socket.on('chat',(data)=>{
        console.log(data)
        io.emit("chat",data)
    })
    socket.on("disconnect",()=>{
        console.log('client disconnected')
      })
  
})


http.listen(3001,()=>{
    console.log('Server runnin on 3001')
})



//yaha se jo user already connected hai unke liye msg send hoga
//show new users msg like welcome and old users show total users