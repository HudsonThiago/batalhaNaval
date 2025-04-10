import { FaRegUser } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3000");

interface player {
  name:string
}

export default function Lobby() {
  const [name,setName] = useState<string>()
  const [player, setPlayer] = useState<player>()
  const [playersInLobby, setPlayersInLobby] = useState<player[]>()

  const submit=(e:React.FormEvent<HTMLInputElement>)=>{
    e.preventDefault()
    if(name != undefined && name?.length > 0){
      let player:player = {name: name}
      setPlayer(player)
      sendPlayer(player)
    }
  }

  const sendPlayer =(player:player)=> {
    socket.emit("player", player)
  }

  useEffect(()=>{
    console.log("VVV")
    socket.on('playersInLobby', (data) => {
      setPlayersInLobby(data);
    })
  }, [socket])

  return (
    <div className="w-full h-full flex justify-center items-center">
        <div className="bg-stone-50/10 w-96 flex flex-col gap-4 p-4 rounded-sm">
          <h2 className=" m-auto text-[2rem] mb-8 text-white font-bold">Batalha naval</h2>
          {
            player == undefined 
            ? (
              <form onSubmit={()=>submit} className="flex flex-col gap-4 p-4 rounded-sm">
                <input 
                  className=" w-full bg-white/20 rounded-sm p-2 text-white focus:border-pink-500 focus:outline-hidden" 
                  maxLength={20}
                  type="text" 
                  placeholder="Nome do jogador" 
                  name="playerName" 
                  id="playerName" 
                  onChange={(v)=>setName(v.target.value)}
                />
                <button className=" m-auto bg-pink-500 rounded-sm p-2 w-40 text-white font-bold cursor-pointer" type="submit">Avançar</button>
              </form>
            )
            : (
              <>
                <div className=" flex flex-row justify-center gap-4 ">
                  <div className=" bg-indigo-400/20 text-indigo-400 flex flex-col gap-2 items-center justify-center w-30 h-20 rounded-xl p-2 border-2 border-dashed animate-pulse ">
                    <p>{player?.name}</p>
                    <FaRegUser />
                  </div>
                  <div className=" text-white flex flex-col gap-2 items-center justify-center w-30 h-20 rounded-xl p-2 border-2 border-dashed animate-pulse ">
                    <p>player 2</p>
                    <AiOutlineLoading className=" animate-spin " />
                  </div>
                </div>
                <p className="m-auto text-white font-bold animate-pulse ">Aguardando o segundo jogador</p>
              </>
            )
          }
        </div>
    </div>
  )
}