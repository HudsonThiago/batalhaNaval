import { ComponentProps, ReactNode } from "react"

export type ShipType = "PORTA_AVIAO" | "ENCOURACADO" | "HIDROAVIAO" | "SUBMARINO" | "CRUZADOR"

interface DefaultShipProps extends ComponentProps<"button"> {
  shipAmount:number,
  name:string,
  children:ReactNode
  shipType:ShipType
  selectedShip?:ShipType
  disabled?:boolean
}

export default function DefaultShip(props:DefaultShipProps) {
    return(
      <button {...props} className={`bg-stone-50/10 w-30 xl:w-60 h-20 xl:h-30 xl:p-2 rounded-xl grid xl:grid-rows-[30%_70%] gap-2 justify-center items-center cursor-pointer ${props.disabled?"hidden":""} ${props.selectedShip == props.shipType ? "outline-2 outline-offset-2 outline-pink-500 bg-white/30" : "hover:bg-white/20"}`}>
        <p className="text-white font-bold xl:text-lg text-xs">{props.shipAmount} {props.name}</p>
        <div className="flex justify-center items-center ">
        {props.children}
        </div>
      </button>
    )
  }