import { ComponentProps, useEffect, useState, Dispatch } from "react";
import { Cursor, Ships } from "../pages/SelectionPage";
import { ShipType } from "./ships/defaultShip";
import { useBoard } from "../context/boardContext";
import { Player } from "../pages/lobby";
import { FaBomb } from "react-icons/fa6";

interface BoardTileProps extends ComponentProps<"div"> {
  index?: number;
  x: number;
  y: number;
  value: number;
  selectedShip?: ShipType;
  gameTurn?:boolean 
  setSelectedShip: Dispatch<React.SetStateAction<ShipType|undefined>>;
  cursor?: Cursor;
  setCursor: Dispatch<React.SetStateAction<Cursor | undefined>>;
  ships: Ships
  setShips: Dispatch<React.SetStateAction<Ships>>;
  player?:Player
  setPlayer:Dispatch<React.SetStateAction<Player | undefined>>
  playerTurn?:number
  setShipClicked?:Dispatch<React.SetStateAction<number | undefined>>
  enemyPlayer?: Player 
  attack?:boolean
  setAttack?:Dispatch<React.SetStateAction<boolean>>
}

interface Coords {
  x:number
  y:number
}

const getIndexByCoords=(coords:Coords)=>{
  let value = (coords.x-1)*10+coords.y-1
  if(value >= 0 && value <= 99){
    return value
  }
  return null
}

export default function BoardTile({
  index = 0,
  x,
  y,
  selectedShip,
  setSelectedShip,
  cursor,
  setCursor,
  ships,
  setShips,
  player,
  setPlayer,
  playerTurn,
  gameTurn = false,
  setShipClicked,
  enemyPlayer,
  attack,
  setAttack
}: BoardTileProps) {
  const [coords, setCoords] = useState<Coords>({
    x: 1,
    y: 1,
  });
  const {board, setBoard, changed, changeState} = useBoard()
  const [boardIndex, setBoardIndex] = useState<number>(getIndexByCoords({x: x, y: y}) || 0)
  const [tileValue, setTileValue] = useState<number>(board[boardIndex] | 0)
  const [attackTileValue, setAttackTileValue] = useState<number>()

  useEffect(() => {
    setCoords({ x: x, y: y });
  }, [boardIndex]);

  useEffect(()=>{
    if(tileValue != board[boardIndex]){
      setTileValue(board[boardIndex] | 0)
    }
  }, [changed, board])

  // useEffect(() => {
  //   if(attackBoard) {
  //     setAttackTileValue(attackBoard[boardIndex])
  //     console.log("BBBBBBBBBB")
  //   }
  // }, [playerTurn]);

  const isInsideShip=(coords:Coords[])=>{
    let isInside:boolean = false
    coords.forEach(c=>{
      for(let x=-1;x<2;x++){
        for(let y=-1;y<2;y++){
          let value = getIndexByCoords({x: c.x+x, y: c.y+y})
          if(value){
            if(board[value] == 1){
              isInside = true
            }
          }
        }
      }
    })
    return isInside
  }

  const isPortaAviao = () => {

    if(cursor && cursor.x && cursor.y){
      let portaAviaoPos = [
        {x:cursor.x, y:cursor.y},
        {x:cursor.x, y:cursor.y+1},
        {x:cursor.x, y:cursor.y+2},
        {x:cursor.x, y:cursor.y+3},
      ]

      let isInside = isInsideShip(portaAviaoPos)

      return (
        cursor &&
        coords &&
        selectedShip &&
        selectedShip === "PORTA_AVIAO" &&
        (coords.y === cursor.y ||
          coords.y - 1 === cursor.y ||
          coords.y - 2 === cursor.y ||
          coords.y - 3 === cursor.y) &&
        coords.x === cursor.x &&
        cursor.y < 8 &&
        !isInside
      )
    }
  };

  const isEncouracado = () => {

    if(cursor && cursor.x && cursor.y){
      let encouracadoPos = [
        {x:cursor.x, y:cursor.y},
        {x:cursor.x, y:cursor.y+1},
        {x:cursor.x, y:cursor.y+2},
      ]

      let isInside = isInsideShip(encouracadoPos)
  
      return (
        cursor &&
        coords &&
        selectedShip &&
        selectedShip === "ENCOURACADO" &&
        (coords.y === cursor.y ||
          coords.y - 1 === cursor.y ||
          coords.y - 2 === cursor.y) &&
        coords.x === cursor.x &&
        cursor.y < 9 &&
        !isInside
      );
    }
  };

  const isCruzador = () => {

    if(cursor && cursor.x && cursor.y){
      let cruzadorPos = [
        {x:cursor.x, y:cursor.y},
        {x:cursor.x, y:cursor.y+1}
      ]

      let isInside = isInsideShip(cruzadorPos)

      return (
        cursor &&
        coords &&
        selectedShip &&
        selectedShip === "CRUZADOR" &&
        (coords.y === cursor.y || coords.y - 1 === cursor.y) &&
        coords.x === cursor.x &&
        cursor.y < 10 &&
        !isInside
      )
    }
  };

  const isSubmarino = () => {
    if(cursor && cursor.x && cursor.y){
      let submarinoPos = [
        {x:cursor.x, y:cursor.y}
      ]

      let isInside = isInsideShip(submarinoPos)

      return (
        selectedShip &&
        selectedShip === "SUBMARINO" &&
        cursor &&
        coords &&
        coords.x === cursor.x &&
        coords.y === cursor.y &&
        !isInside
      )
    }
  };

  const isHidroaviao = () => {

    if(cursor && cursor.x && cursor.y){
      let hidroAviaoPos = [
        {x:cursor.x, y:cursor.y},
        {x:cursor.x-1, y:cursor.y+1},
        {x:cursor.x, y:cursor.y+2}
      ]

      let isInside = isInsideShip(hidroAviaoPos)

      return (
        cursor &&
        coords &&
        selectedShip &&
        selectedShip === "HIDROAVIAO" &&
        ((coords.y === cursor.y && coords.x === cursor.x) ||
          (coords.y - 1 === cursor.y && coords.x + 1 === cursor.x) ||
          (coords.y - 2 === cursor.y && coords.x === cursor.x)
        ) &&
        cursor.y < 9 &&
        cursor.x > 1 &&
        !isInside
      )
    }
  };

  const tileType = () => {
    if (x == 0 && y > 0) {
      return (
        <div
          className="w-6 xl:w-8 h-6 xl:h-8 bg-white/100 rounded-sm shadow-sm shadow-pink-200 select-none flex justify-center items-center font-bold text-stone-700 "
          key={"tile-" + index}
        >
          {String.fromCharCode(64 + y)}
        </div>
      );
    } else if (y == 0 && x > 0) {
      return (
        <div
          className="w-6 xl:w-8 h-6 xl:h-8 bg-white/100 rounded-sm shadow-sm shadow-pink-200 select-none flex justify-center items-center font-bold text-stone-700 "
          key={"tile-" + index}
        >
          {x}
        </div>
      );
    } else {
      if(x>0 && y>0){
        if(tileValue === 0){
          if (isSubmarino()) {
            return (
              <div
                onMouseEnter={() => setCursor({ x: coords.x, y: coords.y })}
                onMouseLeave={() => setCursor({ x: undefined, y: undefined })}
                className={`w-6 xl:w-8 h-6 xl:h-8 bg-green-300/80 animate-pulse rounded-sm select-none cursor-pointer flex justify-center items-center`}
                key={"tile-" + index}
                onClick={()=>{
                  if(ships.submarinos>0){
                    let tile = board;
                    tile[boardIndex] = 1
                    setBoard(tile);
                    changeState()
                    setTileValue(tile[boardIndex])
                    setShips({...ships, submarinos: ships.submarinos-1})
                    if(ships.submarinos-1 == 0) setSelectedShip(undefined)
                  }
                }}
              ></div>
            )
          } else if (isCruzador()) {
              return (
                <div
                  onMouseEnter={() => setCursor({ x: coords.x, y: coords.y })}
                  onMouseLeave={() => setCursor({ x: undefined, y: undefined })}
                  className={`w-6 xl:w-8 h-6 xl:h-8 bg-orange-300/80 animate-pulse rounded-sm select-none cursor-pointer flex justify-center items-center`}
                  key={"tile-" + index}
                  onClick={()=>{
                    if(ships.cruzadores>0){
                      let tile = board;
                      tile[boardIndex] = 1
                      tile[boardIndex+1] = 1
                      setBoard(tile);
                      changeState()
                      setTileValue(tile[boardIndex])
                      setShips({...ships, cruzadores: ships.cruzadores-1})
                      if(ships.cruzadores-1 == 0) setSelectedShip(undefined)
                    }
                  }}
                ></div>
              );
          } else if (isEncouracado()) {
            return (
              <div
                onMouseEnter={() => setCursor({ x: coords.x, y: coords.y })}
                onMouseLeave={() => setCursor({ x: undefined, y: undefined })}
                className={`w-6 xl:w-8 h-6 xl:h-8 bg-red-300/80 animate-pulse rounded-sm select-none cursor-pointer flex justify-center items-center`}
                key={"tile-" + index}
                onClick={()=>{
                  if(ships.encouracados>0){
                    let tile = board;
                    tile[boardIndex] = 1
                    tile[boardIndex+1] = 1
                    tile[boardIndex+2] = 1
                    setBoard(tile);
                    changeState()
                    setTileValue(tile[boardIndex])
                    setShips({...ships, encouracados: ships.encouracados-1})
                    if(ships.encouracados-1 == 0) setSelectedShip(undefined)
                  }
                }}
              ></div>
            );
          } else if (isPortaAviao()) {
            return (
              <div
                onMouseEnter={() => setCursor({ x: coords.x, y: coords.y })}
                onMouseLeave={() => setCursor({ x: undefined, y: undefined })}
                className={`w-6 xl:w-8 h-6 xl:h-8 bg-yellow-100/80 animate-pulse rounded-sm select-none cursor-pointer flex justify-center items-center`}
                key={"tile-" + index}
                onClick={()=>{
                  if(ships.portaAvioes>0){
                    let tile = board;
                    tile[boardIndex] = 1
                    tile[boardIndex+1] = 1
                    tile[boardIndex+2] = 1
                    tile[boardIndex+3] = 1
                    setBoard(tile)
                    changeState()
                    setTileValue(tile[boardIndex])
                    setShips({...ships, portaAvioes: ships.portaAvioes-1})
                    if(ships.portaAvioes-1 == 0) setSelectedShip(undefined)
                  }
                }}
              ></div>
            );
          } else if (isHidroaviao()) {
              return (
                <div
                  onMouseEnter={() => setCursor({ x: coords.x, y: coords.y })}
                  onMouseLeave={() => setCursor({ x: undefined, y: undefined })}
                  className={`w-6 xl:w-8 h-6 xl:h-8 bg-cyan-200/80 animate-pulse rounded-sm select-none cursor-pointer flex justify-center items-center`}
                  key={"tile-" + index}
                  onClick={()=>{
                    if(ships.hidroavioes>0){
                      let tile = board;
                      tile[boardIndex] = 1
                      tile[boardIndex-10+1] = 1
                      tile[boardIndex+2] = 1
                      setBoard(tile)
                      changeState()
                      setTileValue(tile[boardIndex])
                      setShips({...ships, hidroavioes: ships.hidroavioes-1})
                      if(ships.hidroavioes-1 == 0) setSelectedShip(undefined)
                    }
                  }}
                ></div>
              )
          } else {
            return (
              <div
                onMouseEnter={() => setCursor({ x: coords.x, y: coords.y })}
                onMouseLeave={() => setCursor({ x: undefined, y: undefined })}
                onClick={()=>{
                  if(attack && gameTurn === true && playerTurn == player?.position && coords && setShipClicked){
                    let c = getIndexByCoords(coords) || 0
                    setShipClicked(c)
                    if(setAttack){
                      setAttack(false)
                    }
                  }
                }}
                className={`w-6 xl:w-8 h-6 xl:h-8 bg-white/60 rounded-sm shadow-sm shadow-pink-200 select-none cursor-pointer flex justify-center items-center ${
                  !selectedShip && "hover:bg-white/80 hover:animate-pulse"
                }`}
                key={"tile-" + index}
              >
              </div>
            )
          }
        } else if(tileValue === 1){
          return (
            <div
              onMouseEnter={() => setCursor({ x: coords.x, y: coords.y })}
              onMouseLeave={() => setCursor({ x: undefined, y: undefined })}
              className={`w-6 xl:w-8 h-6 xl:h-8 bg-pink-500 rounded-sm shadow-sm select-none cursor-pointer flex justify-center items-center`}
              key={"tile-" + index}
            >
            </div>
          )
        } else if(tileValue === 2){
          return (
            <div
              onMouseEnter={() => setCursor({ x: coords.x, y: coords.y })}
              onMouseLeave={() => setCursor({ x: undefined, y: undefined })}
              className={`w-6 xl:w-8 h-6 xl:h-8 bg-red-400 rounded-sm shadow-sm select-none cursor-pointer flex justify-center items-center`}
              key={"tile-" + index}
            >
            </div>
          )
        } else if(tileValue === 3){
          return (
            <div
              onMouseEnter={() => setCursor({ x: coords.x, y: coords.y })}
              onMouseLeave={() => setCursor({ x: undefined, y: undefined })}
              className={`w-6 xl:w-8 h-6 xl:h-8 bg-red-600 rounded-sm shadow-sm select-none cursor-pointer flex justify-center items-center`}
              key={"tile-" + index}
            >
            {
              <FaBomb className=" text-white text-lg "/>
            }
            </div>
          )
        }
      } else {
        return (
          <div
            className="w-6 xl:w-8 h-6 xl:h-8 rounded-sm shadow-sm select-none flex justify-center items-center "
            key={"tile-" + index}
          ></div>
        )
      }
    }
  }

  return tileType();
}
