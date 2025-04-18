import { ComponentProps } from "react"
import DefaultShip, { ShipType } from "./defaultShip"

interface DefaultShipProps extends ComponentProps<"button"> {
  shipAmount:number
  name:string
  shipType:ShipType
  selectedShip?:ShipType
}

export default function PortaAvioes(props:DefaultShipProps) {
    return(
      <DefaultShip {...props}>
        <div className="grid grid-rows-1 grid-cols-4 gap-0.5">
          <div className="w-6 h-6 bg-yellow-400 rounded-sm shadow-sm shadow-gray-900"></div>
          <div className="w-6 h-6 bg-yellow-400 rounded-sm shadow-sm shadow-gray-900"></div>
          <div className="w-6 h-6 bg-yellow-400 rounded-sm shadow-sm shadow-gray-900"></div>
          <div className="w-6 h-6 bg-yellow-400 rounded-sm shadow-sm shadow-gray-900"></div>
        </div>
      </DefaultShip>
    )
  }