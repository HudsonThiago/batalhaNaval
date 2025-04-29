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

let players = []

io.on('connection', (socket) => {
  console.log('a user connected | id: '+socket.id);

  socket.on('emitPlayer', (emitPlayer) => {
    let playersInLobby = findPlayersInLobby(emitPlayer.lobbyId);
    if(playersInLobby.length < 2){
      emitPlayer['position'] = findPlayersInLobby(emitPlayer.lobbyId).length+1
      emitPlayer['id'] = socket.id
      emitPlayer['lobbyId'] = emitPlayer.lobbyId
      emitPlayer['board'] = null
      players.push(emitPlayer)
      socket.join(emitPlayer.lobbyId)
      let playersInLobby = findPlayersInLobby(emitPlayer.lobbyId)
  
      io.to(emitPlayer.lobbyId).emit("getPlayersInLobby", playersInLobby)
      socket.emit("updatePlayer", emitPlayer)
    } else {
      socket.emit("error", "Esta sala já está ocupada, tente outra sala")
    }
  })

  socket.on('gameStart', ({room}) => {
    io.to(room).emit("selection", "jogo começou")
  })

  socket.on('emitBoard', ({room, board}) => {
    let player = findPlayer(socket.id)
    player['board'] = board
    updatePlayers(player)
    if(areReady(player.lobbyId)==2){
      io.to(room).emit("startGame", "jogo começou")
    }
    console.log("aguardando o jogo começar")
  })


  socket.on('disconnect', () => {
    let player = findPlayer(socket.id)
    players = players.filter(j=>j.id !== socket.id)
    io.to(player.lobbyId).emit("getPlayersInLobby", players)
  })
  
});

server.listen(porta, () => {
  console.log('server is running');
});



const findPlayersInLobby =(lobbyId)=>{
  return players.filter(p=>p.lobbyId === lobbyId)
}

const updatePlayers=(player)=>{
  players = players.map((p)=> {
    if(p.id === player.id){
      return player
    } else {
      return p
    }
  })
}

const findPlayer =(id)=>{
  return players.filter(j=>j.id === id)[0]
}

const areReady=(lobbyId)=>{
  return players.filter((p)=>p.lobbyId === lobbyId && p.board !== null).length
}