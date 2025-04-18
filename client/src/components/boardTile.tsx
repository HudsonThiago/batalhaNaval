import { ComponentProps, useEffect, useState } from "react";
import { Cursor } from "../pages/main";
import { ShipType } from "./ships/defaultShip";

interface BoardTileProps extends ComponentProps<"div"> {
  index?:number
  x:number
  y:number
  value:number
  selectedShip?:ShipType
  cursor?:Cursor
  setCursor:React.Dispatch<React.SetStateAction<Cursor | undefined>>
}

export default function BoardTile({index, x, y, value=0, selectedShip, cursor, setCursor}:BoardTileProps) {
  const [coords, setCoords] = useState<{x:number,y:number}>({x:1,y:1})

  useEffect(()=>{
    setCoords({x:x, y:y})
    console.log(cursor, coords)
  }, [])


  const isPortaAviao=()=>{
    return cursor && coords && selectedShip && selectedShip === "PORTA_AVIAO" && (coords.y === cursor.y || coords.y-1 === cursor.y || coords.y-2 === cursor.y || coords.y-3 === cursor.y) && coords.x === cursor.x && cursor.y < 8
  }

  const isEncouracado=()=>{
    return cursor && coords && selectedShip && selectedShip === "ENCOURACADO" && (coords.y === cursor.y || coords.y-1 === cursor.y || coords.y-2 === cursor.y) && coords.x === cursor.x && cursor.y < 9
  }

  const isCruzador=()=>{
    return cursor && coords && selectedShip && selectedShip === "CRUZADOR" && (coords.y === cursor.y || coords.y-1 === cursor.y) && coords.x === cursor.x && cursor.y < 10
  }

  const isSubmarino=()=>{
    return cursor && coords && selectedShip && selectedShip === "SUBMARINO" && coords.x === cursor.x && coords.y === cursor.y
  }

  const isHidroaviao=()=>{
    return cursor && coords && selectedShip && selectedShip === "HIDROAVIAO" && ((coords.y === cursor.y && coords.x === cursor.x) || (coords.y-1 === cursor.y && coords.x+1 === cursor.x) || (coords.y-2 === cursor.y && coords.x === cursor.x)) && cursor.y < 9 && cursor.x > 1
  }

  const tileType=()=>{
    if(x == 0 && y > 0){
      return <div className="w-8 h-8 bg-white/100 rounded-sm shadow-sm shadow-pink-200 select-none flex justify-center items-center font-bold text-stone-700 " key={"tile-"+index}>{String.fromCharCode(64+y)}</div>
    } else if (y == 0 && x > 0) {
      return <div className="w-8 h-8 bg-white/100 rounded-sm shadow-sm shadow-pink-200 select-none flex justify-center items-center font-bold text-stone-700 " key={"tile-"+index}>{x}</div>
    } else {
      if(x > 0 && y > 0){
        if(isPortaAviao()){
          return <div
            onMouseEnter={()=>setCursor({x: coords.x, y:coords.y})}
            onMouseLeave={()=>setCursor({x: undefined, y:undefined})}
            className={`w-8 h-8 bg-yellow-100/80 animate-pulse rounded-sm select-none cursor-pointer flex justify-center items-center`} key={"tile-"+index}
          ></div>
        } else if(isEncouracado()){
          return <div
            onMouseEnter={()=>setCursor({x: coords.x, y:coords.y})}
            onMouseLeave={()=>setCursor({x: undefined, y:undefined})}
            className={`w-8 h-8 bg-red-300/80 animate-pulse rounded-sm select-none cursor-pointer flex justify-center items-center`} key={"tile-"+index}
          ></div>
        } else if(isCruzador()){
          return <div
            onMouseEnter={()=>setCursor({x: coords.x, y:coords.y})}
            onMouseLeave={()=>setCursor({x: undefined, y:undefined})}
            className={`w-8 h-8 bg-orange-300/80 animate-pulse rounded-sm select-none cursor-pointer flex justify-center items-center`} key={"tile-"+index}
          ></div>
        } else if(isSubmarino()){
          return <div
            onMouseEnter={()=>setCursor({x: coords.x, y:coords.y})}
            onMouseLeave={()=>setCursor({x: undefined, y:undefined})}
            className={`w-8 h-8 bg-green-300/80 animate-pulse rounded-sm select-none cursor-pointer flex justify-center items-center`} key={"tile-"+index}
          ></div>
        } else if(isHidroaviao()){
          return <div
            onMouseEnter={()=>setCursor({x: coords.x, y:coords.y})}
            onMouseLeave={()=>setCursor({x: undefined, y:undefined})}
            className={`w-8 h-8 bg-sky-200/80 animate-pulse rounded-sm select-none cursor-pointer flex justify-center items-center`} key={"tile-"+index}
          ></div>
        } else {
          return <div
            onMouseEnter={()=>setCursor({x: coords.x, y:coords.y})}
            onMouseLeave={()=>setCursor({x: undefined, y:undefined})}
            className={`w-8 h-8 bg-white/60 rounded-sm shadow-sm shadow-pink-200 select-none cursor-pointer flex justify-center items-center ${!selectedShip && "hover:bg-white/80 hover:animate-pulse"}`} key={"tile-"+index}
          ></div>
        }
      } else {
        return <div className="w-8 h-8 rounded-sm shadow-sm select-none flex justify-center items-center " key={"tile-"+index}></div>
      }
    }
  }

  return (
    tileType()
  )
}