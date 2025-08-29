import logo from './logo.svg';
import io from "socket.io-client"
import {nanoid} from "nanoid"
import { useEffect, useState } from 'react';
const socket = io.connect("http://localhost:3001")
function App() {
  const [message,setmessage] = useState('')
  const [chat,setchat] = useState([])
  const [userId] = useState(nanoid()) 
  const sendChat = (e) =>{

    e.preventDefault()
      
   socket.emit("chat",{user:userId,message})
    setmessage('')
  }
  useEffect(()=>{
    const handleChat = (data) => {
      setchat(prev => [...prev, data])
    }

    socket.on("chat", handleChat)

    return () => {
      socket.off("chat", handleChat) 
    }
  },[])
  return (
    <>
      <h1>whats App</h1>
      {chat.map((e,i)=>(
        <p key={i}>{e.message}</p>
      ))}
      <form onSubmit={sendChat} action="">
        <input type="text" value={message} onChange={(e)=>setmessage(e.target.value)} />
        <button type='submit'>send</button>
     
      </form>
    </>
  );
}

export default App;
