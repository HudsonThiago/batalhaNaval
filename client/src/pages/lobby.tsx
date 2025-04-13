import { FaRegUser } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:3000")

interface player {
  id?:string
  name:string
  lobbyId: string
  leader: boolean
}

export default function Lobby() {
  const navigate = useNavigate();
  const [interimPlayer,setInterimPlayer] = useState<player>()
  const [player, setPlayer] = useState<player>()
  const [playersInLobby, setPlayersInLobby] = useState<player[]>([])

  const sendPlayer = (player:player) => {
    socket.emit("emitPlayer", player)
  }

  const gameStart = () => {
    socket.emit("gameStart")
  }

  useEffect(()=>{
    socket.on("getPlayersInLobby",(data)=>{
      setPlayersInLobby(data)
    })
    
    socket.on("gameStart",()=>{
      console.log("AAAAAAAAAA")
      navigate("/game")
    })
  }, [socket])

  const submit=()=>{
    if(interimPlayer != undefined){
      setPlayer(interimPlayer)
      sendPlayer(interimPlayer)
    }
  }

  const registerScreen=()=>{
    return (
      <div className="flex flex-col gap-4 p-4 rounded-sm">
        <input 
          className=" w-full bg-white/20 rounded-sm p-2 text-white focus:border-pink-500 focus:outline-hidden" 
          maxLength={20}
          type="text" 
          placeholder="ID da sala" 
          name="playerName" 
          id="playerName" 
          onChange={(v)=>setInterimPlayer({...interimPlayer, lobbyId: v.target.value} as player)}
        />
        <input 
          className=" w-full bg-white/20 rounded-sm p-2 text-white focus:border-pink-500 focus:outline-hidden" 
          maxLength={12}
          type="text" 
          placeholder="Nome do jogador" 
          name="playerName" 
          id="playerName" 
          onChange={(v)=>setInterimPlayer({...interimPlayer, name: v.target.value} as player)}
        />
        <button onClick={submit} className=" m-auto bg-pink-500 rounded-sm p-2 w-40 text-white font-bold cursor-pointer" type="button">Avançar</button>
      </div>
    )
  }

  const lobbyScreen=()=>{
    return (
<>
      <div className=" flex flex-row justify-center gap-4 ">
        { playersInLobby?.length > 1
          ? playersInLobby.map((p)=>{
            return <div key={p.id} className=" bg-indigo-400/20 text-indigo-400 flex flex-col gap-2 items-center justify-center w-30 h-20 rounded-xl p-2 border-2 border-dashed animate-pulse ">
              <p>{p?.name}</p>
              <FaRegUser />
            </div>
          })
          : <>
          <div className=" bg-indigo-400/20 text-indigo-400 flex flex-col gap-2 items-center justify-center w-30 h-20 rounded-xl p-2 border-2 border-dashed animate-pulse ">
              <p>{playersInLobby[0]?.name}</p>
              <FaRegUser />
            </div>
          <div className=" text-white flex flex-col gap-2 items-center justify-center w-30 h-20 rounded-xl p-2 border-2 border-dashed animate-pulse ">
            <p>player 2</p>
            <AiOutlineLoading className=" animate-spin " />
          </div>                  
        </>
        }
      </div>
      {playersInLobby.length < 2
      ?
      <p className="m-auto text-white font-bold animate-pulse ">Aguardando o segundo jogador</p>
      :
      <button onClick={gameStart} className=" m-auto bg-pink-500 rounded-sm p-2 w-40 text-white font-bold cursor-pointer" type="button">Começar partida</button>
      }
    </>
    )
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
        <div className="bg-stone-50/10 w-96 flex flex-col gap-4 p-4 rounded-sm">
          <h2 className=" m-auto text-[2rem] mb-8 text-white font-bold">Batalha naval</h2>
          {
            player === undefined 
            ? registerScreen()
            : lobbyScreen()
          }
        </div>
    </div>
  )
}