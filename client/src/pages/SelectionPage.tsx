import { ComponentProps, Dispatch, useState } from "react";
import BoardTile from "../components/boardTile";
import PortaAvioes from "../components/ships/portaAvioes";
import Encouracado from "../components/ships/encouracado";
import Cruzador from "../components/ships/cruzador";
import Submarino from "../components/ships/submarino";
import Hidroaviao from "../components/ships/hidroaviao";
import { ShipType } from "../components/ships/defaultShip";
import { BoardProvider } from "../context/boardContext";
import Board from "../components/board";
import { Player } from "./lobby";

interface SelectionPageProps extends ComponentProps<"div"> {
  player?:Player
  setPlayer:Dispatch<React.SetStateAction<Player | undefined>>
  playerTurn: number
  socket: any
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

export default function SelectionPage({player, setPlayer, socket, playerTurn}:SelectionPageProps) {
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
      <div className="absolute right-0 w-40 xl:w-80 h-[100vh] flex flex-wrap flex-row xl:flex-col justify-center items-center gap-2">
        <PortaAvioes
          onClick={() =>
            selectedShip === "PORTA_AVIAO"
              ? setSelectedShip(undefined)
              : setSelectedShip("PORTA_AVIAO")
          }
          disabled={ships.portaAvioes==0}
          shipType="PORTA_AVIAO"
          selectedShip={selectedShip}
          shipAmount={ships.portaAvioes}
          name="Porta-aviões"
        />
        <Encouracado
          onClick={() =>
            selectedShip === "ENCOURACADO"
              ? setSelectedShip(undefined)
              : setSelectedShip("ENCOURACADO")
          }
          disabled={ships.encouracados==0}
          shipType="ENCOURACADO"
          selectedShip={selectedShip}
          shipAmount={ships.encouracados}
          name="Encouraçados"
        />
        <Cruzador
          onClick={() =>
            selectedShip === "CRUZADOR"
              ? setSelectedShip(undefined)
              : setSelectedShip("CRUZADOR")
          }
          disabled={ships.cruzadores==0}
          shipType="CRUZADOR"
          selectedShip={selectedShip}
          shipAmount={ships.cruzadores}
          name="Cruzadores"
        />
        <Submarino
          onClick={() =>
            selectedShip === "SUBMARINO"
              ? setSelectedShip(undefined)
              : setSelectedShip("SUBMARINO")
          }
          disabled={ships.submarinos==0}
          shipType="SUBMARINO"
          selectedShip={selectedShip}
          shipAmount={ships.submarinos}
          name="Submarinos"
        />
        <Hidroaviao
          onClick={() =>
            selectedShip === "HIDROAVIAO"
              ? setSelectedShip(undefined)
              : setSelectedShip("HIDROAVIAO")
          }
          disabled={ships.hidroavioes==0}
          shipType="HIDROAVIAO"
          selectedShip={selectedShip}
          shipAmount={ships.hidroavioes}
          name="Hidroavião"
        />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-stone-50/10 w-[90%] xl:w-auto mx-auto xl:p-8 p-4 sm:w-96 flex flex-col gap-4 rounded-sm">
          <h2 className=" flex justify-center w-full m-auto xl:text-[2rem] text-[1.4rem] mb-8 text-white font-bold">
            Coloque as embarcações
          </h2>
          <Board
            cursor={cursor}
            setCursor={setCursor}
            ships={ships}
            setShips={setShips}
            selectedShip={selectedShip}
            setSelectedShip={setSelectedShip}
            player={player}
            setPlayer={setPlayer}
            actions={true}
            playerTurn={playerTurn}
            socket={socket}
          />
        </div>
      </div>
    </BoardProvider>
  )
}
