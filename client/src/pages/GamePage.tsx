import { ComponentProps, Dispatch, useState } from "react";
import { ShipType } from "../components/ships/defaultShip";
import { BoardProvider } from "../context/boardContext";
import Board from "../components/board";
import { Player } from "./lobby";

interface GamePageProps extends ComponentProps<"div"> {
    player?:Player
    setPlayer:Dispatch<React.SetStateAction<Player | undefined>>
    attackBoard?:number[]
    enemyPlayer?:Player
    playerTurn: number
    socket:any
}

export interface Ships {
  portaAvioes: number;
  encouracados: number;
  hidroavioes: number;
  submarinos: number;
  cruzadores: number;
}

export interface Cursor {
  x?: number;
  y?: number;
}

export default function GamePage({player, setPlayer, enemyPlayer, attackBoard, playerTurn, socket}:GamePageProps) {
  const [ships, setShips] = useState<Ships>({
    // portaAvioes: 1,
    // encouracados: 1,
    // hidroavioes: 2,
    // submarinos: 3,
    // cruzadores: 2,
    portaAvioes: 0,
    encouracados: 0,
    hidroavioes: 0,
    submarinos: 3,
    cruzadores: 0,
  });
  const [cursor, setCursor] = useState<Cursor | undefined>();
  const [selectedShip, setSelectedShip] = useState<ShipType|undefined>(undefined);

  return (
    <BoardProvider>
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-stone-50/10 w-[90%] xl:w-auto mx-auto xl:p-8 p-4 sm:w-96 flex flex-col gap-4 rounded-sm">
          
            {playerTurn === player?.position
            ? <div className=" flex flex-col gap-1 mb-8 justify-center items-center">
                <h2 className=" flex justify-center w-full m-0 p-0 text-[2rem] text-white font-bold">Sua vez</h2>
                <p className=" flex justify-center w-full m-0 p-0 text-white">Selecione uma casa para atacar</p>
            </div>
            : <div className=" flex flex-col gap-1 mb-8 justify-center items-center">
                <p className=" flex justify-center w-full m-0 p-0 text-[1.5rem] text-white font-bold">Aguardando o outro jogador</p>
            </div>
            }
            <Board
                cursor={cursor}
                setCursor={setCursor}
                ships={ships}
                setShips={setShips}
                selectedShip={selectedShip}
                setSelectedShip={setSelectedShip}
                player={player}
                setPlayer={setPlayer}
                playerTurn={playerTurn}
                actions={false}
                gameTurn={true}
                socket={socket}
                enemyPlayer={enemyPlayer}
            />
        </div>
      </div>
    </BoardProvider>
  )
}
