import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from "cors"
const app = express();
const server = createServer(app);

const porta = 3000
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

server.listen(porta, () => {
  console.log('server running at http://localhost:3000');
});

let connections = 0;
let jogadores = []

io.on('connection', (socket) => {
  connections++;
  console.log('a user connected | id: '+socket.id);

  socket.on('player', (player) => {
    player['id'] = player.id
    jogadores.push(player)
    console.log(jogadores)
  })
  
  socket.on('disconnect', () => {
    console.log(jogadores)
    jogadores = jogadores.filter(j=>j.id !== socket.id)
  })

  io.emit('playersInLobby', jogadores)
});