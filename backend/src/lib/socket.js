import express from "express";
import http from "http";
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.FRONTENED_URL || "http://localhost:5173";

const io = new Server(server, { cors: {origin: [allowedOrigin] }});

function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

// online users map = { userid: socketId }
const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if(userId) userSocketMap[userId] = socket.id;

    // io.emit() sends event to everyone - broadcast
    io.emit("getonlineUsers", Object.keys(userSocketMap));

    //socket.on is used to listen for events
    socket.on("disconnect", () => {
        if (userId) delete userSocketMap[userId];
        io.emit("getOnlineusers", Object.keys(userSocketMap));
    });
});

export {app, server, io, getReceiverSocketId };