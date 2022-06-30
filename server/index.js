import http from "http";
import express from "express";
import cors from "cors";
import {Server} from "socket.io";
import dotenv from "dotenv";

const app=express();

if(process.env.PRODUCTION!=="production")
    dotenv.config({ path: "config/config.env" });

const port= process.env.PORT ;


const users=[{}];

app.use(cors());
app.get("/api/v1/",(req,res)=>{
    res.send("HELL ITS WORKING");
})

const server=http.createServer(app);

const io=new Server(server);

io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`,role:"admin"});
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat, ${users[socket.id]}`,role:"admin"})
    })

    socket.on('chatting',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    })


    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`,role:"admin"});
    })


});


server.listen(port,()=>{
    console.log(`Working ${port}`);
})