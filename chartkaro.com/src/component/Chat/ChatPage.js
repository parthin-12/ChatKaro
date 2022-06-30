import React, { useEffect, useState } from 'react';
import {user} from "../Join/JoinPage.js"
import Logo from "../../Images/send.png"
import closeIcon from "../../Images/closeIcon.png"
import "./ChartPage.css"
import Message from '../Message/Message.js';
import SocketIO from "socket.io-client";
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ENDPOINT="https://chat-karo-201901113.herokuapp.com/"; /// we will add process.env.ENDPOINT Later when deploying 




let socket;

const ChatPage = () => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState("");
    const [id, setId] = useState("");
    const navigate=useNavigate();


    useEffect(() => {
        
        socket=SocketIO(ENDPOINT,{transports:['websocket']});
  
        socket.on("connect",()=>{
            setId(socket.id);
            socket.emit("joined",{user});
            socket.on("welcome",(data)=>{
                setMessages([...messages,data]);
                console.log(data.user,data.message);
            });  
        });


      return () => {
        socket.off();
      }

    }, [])


    useEffect(() => {
      socket.on('sendMessage',(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message,data.id);
      })

      socket.on("userJoined",(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message);
    });

    socket.on("leave",(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message);
    })
    
      return ()=>{
        socket.off();
      }

    }, [messages]);

    
    


    const chatFormSubmitHandler=(e)=>{
        e.preventDefault();
        if(message.trim()){
            socket.emit("chatting",{message,id});
            document.getElementById("messageChat").value="";
            setMessage("");
        }else
            return;
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(scrollToBottom, [messages]);
    useEffect(()=>{
        if(!user){
            return navigate("/");
        }
    }
    ,[user]);


  return (
    <div className="chatPage">
        <div className="chatContainer">
            <div className="header">
                <h1>Chat<div>Karo.com</div></h1>
                <img onClick={()=>(navigate("/"))} src={closeIcon} alt="Logo"/>
            </div>
            <div className="chatBox">
                {messages && messages.map((e,i)=>(
                    <Message key={i} user={e.user} message={e.message} role={e.id===id?"me":(e.role==="admin"?"admin":"left")}/>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className="chatForm" onSubmit={chatFormSubmitHandler}>
                <input id='messageChat' type="text" placeholder='Type here...' onChange={(e)=>(setMessage(e.target.value))}/>
                <button className='chatSendBtn' type="submit"><img src={Logo} alt="Logo"/></button>
            </form>
        </div>
    </div>
  )
}

export default ChatPage