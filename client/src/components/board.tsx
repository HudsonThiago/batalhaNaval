import { Dispatch, useEffect, useState } from "react";
import { useBoard } from "../context/boardContext";
import BoardTile from "./boardTile";
import { ShipType } from "./ships/defaultShip";
import { Cursor, Ships } from "../pages/SelectionPage";
import { AiOutlineLoading } from "react-icons/ai";
import { Player } from "../pages/lobby";

interface BoardProps {
  selectedShip?: ShipType;
  setSelectedShip: Dispatch<React.SetStateAction<ShipType|undefined>>
  cursor?: Cursor;
  setCursor: Dispatch<React.SetStateAction<Cursor | undefined>>
  ships: Ships
  setShips: Dispatch<React.SetStateAction<Ships>>
  player?:Player
  setPlayer:Dispatch<React.SetStateAction<Player | undefined>>
  actions:boolean
  gameTurn?:boolean
  playerTurn?:number
  enemyPlayer?:Player
  socket:any
}

export default function board({cursor, setCursor, selectedShip, setSelectedShip, ships, setShips, player, setPlayer, actions, playerTurn, socket, enemyPlayer, gameTurn=false}:BoardProps){

  const {board, setBoard, changed, changeState} = useBoard()
  const [loading, setLoading] = useState<boolean>(false)
  const [shipClicked, setShipClicked] = useState<number|undefined>(undefined);
  const [attack, setAttack] = useState<boolean>(true);

  useEffect(()=>{
    if(shipClicked != undefined && player){
      let atkBoard:number[] = player.attackBoard
      atkBoard[shipClicked] = 1
      setPlayer({...player, attackBoard: atkBoard})
      emitAttack(atkBoard)
    }
  }, [shipClicked])

  useEffect(()=>{
    if(player !== undefined && gameTurn === true){
      if(playerTurn === player?.position){ 
        //Se for o turno do player jogar vai aparecer a tela de selecionar as casas do ataque
        let playerBoard
        if(enemyPlayer){
          playerBoard = player.attackBoard.map((v, i) => v != 0 && v == enemyPlayer.board[i] ? 3 : v == 1? v+1: v);
        } else {
          playerBoard = player.attackBoard
        }
        setBoard(playerBoard)
        setAttack(true)
      } else {
        //Se for não, vai aparecer as casas do player juntamente com as casas atacadas
        let playerBoard
        if(enemyPlayer){
          playerBoard = player.board.map((v, i) => enemyPlayer.attackBoard[i]?v==1?enemyPlayer.attackBoard[i]+2:enemyPlayer.attackBoard[i]+1:v);
        } else {
          playerBoard = player.board
        }
        console.log(playerBoard)
        setBoard(playerBoard)
        setAttack(false)
      }
    }
  }, [playerTurn])


  const emitBoard = (board:number[]) => {
      let attackBoard:number[] = []
  
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          attackBoard.push(0)
        }
      }
      if(player){
        setPlayer({...player, attackBoard: attackBoard})
      }
      socket.emit("emitBoard", {room: player?.lobbyId, board: board, attackBoard: attackBoard});
  };

  const emitAttack=(attackBoard:number[])=>{
    socket.emit("emitAttack", {room: player?.lobbyId, attackBoard: attackBoard});
  }

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
              player={player}
              setPlayer={setPlayer}
              playerTurn={playerTurn}
              gameTurn={gameTurn}
              setShipClicked={setShipClicked}
              enemyPlayer={enemyPlayer}
              attack={attack}
              setAttack={setAttack}
            />
          );
          if(x>0 && y>0){
            boardAux.push(0)
          }
          index++;
        }
      }

      if(player && board.length == 0) {
        setPlayer({...player, board:boardAux})
        setBoard(boardAux)
      }

      return (
        <div className="grid grid-rows-11 grid-cols-11 m-auto xl:gap-2 gap-1 xl:w-[450px] w-[260px]">
          {divs}
        </div>
      );
    };

    return (
      <>
        {getMap()}
        <div className="flex justify-center items-center flex-col mt-4">
          <p className=" text-white text-xl ">
            {player?.name}
          </p>
        </div>
        {actions && (
          <>
            {!loading ?
              <div className="flex justify-center items-center gap-6">
                <button
                  className={` mt-2 bg-pink-500 w-40 rounded-sm p-2 text-white font-bold cursor-pointer ${!isFull() && 'hidden'}`}
                  onClick={()=>{

                    if(player){
                      setPlayer({...player, board: board})
                    }
                    
                    if(gameTurn === false){
                      emitBoard(board)
                    }
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
        )}
      </>
    )
}