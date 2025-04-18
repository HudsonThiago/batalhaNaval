import { ComponentProps, ReactNode } from "react"

export type ShipType = "PORTA_AVIAO" | "ENCOURACADO" | "HIDROAVIAO" | "SUBMARINO" | "CRUZADOR"

interface DefaultShipProps extends ComponentProps<"button"> {
  shipAmount:number,
  name:string,
  children:ReactNode
  shipType:ShipType
  selectedShip?:ShipType
}

export default function DefaultShip(props:DefaultShipProps) {
    return(
      <button {...props} className={`bg-stone-50/10 w-60 h-30 rounded-xl flex flex-col gap-2 justify-center items-center cursor-pointer ${props.selectedShip == props.shipType ? "outline-2 outline-offset-2 outline-pink-500 bg-white/30" : "hover:bg-white/20"}`}>
        <p className="text-white font-bold">{props.shipAmount} {props.name}</p>
        {props.children}
      </button>
    )
  }