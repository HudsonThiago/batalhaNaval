import { useState } from "react";
import BoardTile from "../components/boardTile";
import PortaAvioes from "../components/ships/portaAvioes";
import Encouracado from "../components/ships/encouracado";
import Cruzador from "../components/ships/cruzador";
import Submarino from "../components/ships/submarino";
import Hidroaviao from "../components/ships/hidroaviao";
import { ShipType } from "../components/ships/defaultShip";


interface Ships {
  portaAvioes:number
  encouracados:number
  hidroavioes:number
  submarinos:number
  cruzadores:number
}

export interface Cursor {
  x?:number
  y?:number
}


export default function Main() {
  const [ships, setShips] = useState<Ships>({portaAvioes: 1, encouracados: 1, hidroavioes: 2, submarinos: 3, cruzadores: 2})
  const [cursor, setCursor] = useState<Cursor | undefined>()
  const [selectedShip, setSelectedShip] = useState<ShipType>()

  const getMap = () => {
    const divs: React.ReactNode[] = [];

    let index=0;
    
    for (let x = 0; x <= 10; x++) {
      for (let y = 0; y <= 10; y++) {
        divs.push(<BoardTile value={0} cursor={cursor} selectedShip={selectedShip} key={"tile-"+index} index={index} x={x} y={y} setCursor={setCursor}/>);
        index++
      }
    }
  
    return (
      <div className="grid grid-rows-11 grid-cols-11 m-auto gap-2 w-[450px]">
        {divs}
      </div>
    )
  }

  return (
    <>
    <div className="absolute right-0 w-80 h-[100vh] flex flex-col justify-center items-center gap-2">
      <PortaAvioes onClick={()=>selectedShip === "PORTA_AVIAO" ? setSelectedShip(undefined) :setSelectedShip("PORTA_AVIAO")} shipType="PORTA_AVIAO" selectedShip={selectedShip} shipAmount={ships.portaAvioes} name="Porta-aviões"/>
      <Encouracado onClick={()=>selectedShip === "ENCOURACADO" ? setSelectedShip(undefined) :setSelectedShip("ENCOURACADO")} shipType="ENCOURACADO" selectedShip={selectedShip} shipAmount={ships.encouracados} name="Encouraçados"/>
      <Cruzador onClick={()=>selectedShip === "CRUZADOR" ? setSelectedShip(undefined) :setSelectedShip("CRUZADOR")} shipType="CRUZADOR" selectedShip={selectedShip} shipAmount={ships.cruzadores} name="Cruzadores"/>
      <Submarino onClick={()=>selectedShip === "SUBMARINO" ? setSelectedShip(undefined) :setSelectedShip("SUBMARINO")} shipType="SUBMARINO" selectedShip={selectedShip} shipAmount={ships.submarinos} name="Submarinos"/>
      <Hidroaviao onClick={()=>selectedShip === "HIDROAVIAO" ? setSelectedShip(undefined) :setSelectedShip("HIDROAVIAO")} shipType="HIDROAVIAO" selectedShip={selectedShip} shipAmount={ships.hidroavioes} name="Hidroavião"/>
    </div>
      <div className="w-full h-full flex justify-center items-center">
          <div className="bg-stone-50/10 flex flex-col gap-4 p-8 rounded-sm">
            <h2 className=" flex justify-center w-full m-auto text-[2rem] mb-8 text-white font-bold">Coloque as embarcações</h2>
              {getMap()}
          </div>
      </div>
    </>
  )
}