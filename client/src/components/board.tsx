import { Dispatch, useEffect, useState } from "react";
import { useBoard } from "../context/boardContext";
import BoardTile from "./boardTile";
import { ShipType } from "./ships/defaultShip";
import { Cursor, Ships } from "../pages/SelectionPage";
import { AiOutlineLoading } from "react-icons/ai";

interface BoardProps {
  selectedShip?: ShipType;
  setSelectedShip: Dispatch<React.SetStateAction<ShipType|undefined>>
  cursor?: Cursor;
  setCursor: Dispatch<React.SetStateAction<Cursor | undefined>>
  ships: Ships
  setShips: Dispatch<React.SetStateAction<Ships>>
  emitBoard:(board:number[])=>void
}

export default function board({cursor, setCursor, selectedShip, setSelectedShip, ships, setShips, emitBoard}:BoardProps){

  const {board, setBoard, changed, changeState} = useBoard()
  const [loading, setLoading] = useState<boolean>(false)

  const isFull=()=>{
    if(
      ships.portaAvioes == 0 &&
      ships.encouracados == 0 &&
      ships.cruzadores == 0 &&
      ships.submarinos == 0 &&
      ships.hidroavioes == 0
    ){
      return true
    }
    return false
  }

  const resetBoard=()=>{
    setShips({
      portaAvioes: 1,
      encouracados: 1,
      hidroavioes: 2,
      submarinos: 3,
      cruzadores: 2,
    })

    let boardAux = []
    for (let x = 0; x <= 10; x++) {
      for (let y = 0; y <= 10; y++) {
        boardAux.push(0)
      }
    }
    setBoard(boardAux)
    changeState
  }

  const getMap = () => {
      const divs: React.ReactNode[] = [];
  
      let index = 0;
  
      let boardAux = []
      for (let x = 0; x <= 10; x++) {
        for (let y = 0; y <= 10; y++) {
          divs.push(
            <BoardTile
              value={0}
              key={"tile-" + index}
              index={index}
              x={x}
              y={y}
              cursor={cursor}
              setCursor={setCursor}
              selectedShip={selectedShip}
              setSelectedShip={setSelectedShip}
              ships={ships}
              setShips={setShips}
            />
          );
          if(x>0 && y>0){
            if(!boardAux[index]){
              boardAux.push(0)
            }
          }
          index++;
        }
      }
  
      if(board.length == 0) setBoard(boardAux)

      return (
        <div className="grid grid-rows-11 grid-cols-11 m-auto xl:gap-2 gap-1 xl:w-[450px] w-[260px]">
          {divs}
        </div>
      );
    };

    return (
      <>
        {getMap()}
        {!loading ?
          <div className="flex justify-center items-center gap-6">
          <button
            className={` mt-2 bg-pink-500 w-40 rounded-sm p-2 text-white font-bold cursor-pointer ${!isFull() && 'hidden'}`}
            onClick={()=>{
              emitBoard(board)
              setLoading(true)
            }}
            type="button"
          >
            Confirmar partida
          </button>
          <button
          onClick={resetBoard}
            className=" mt-2 bg-pink-500 w-40 rounded-sm p-2 text-white font-bold cursor-pointer"
            type="button"
          >
            Resetar tabuleiro
          </button>
        </div>
        :
        <div className="flex justify-center items-center flex-col mt-4">
          <AiOutlineLoading className=" text-white animate-spin " />
          <p className="text-white animate-pulse">Aguardando o outro jogador</p>
        </div>
        }
        
      </>
    )
}