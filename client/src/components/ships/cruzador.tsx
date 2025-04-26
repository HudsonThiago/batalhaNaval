import { ComponentProps } from "react"
import DefaultShip, { ShipType } from "./defaultShip"

interface DefaultShipProps extends ComponentProps<"button"> {
  shipAmount:number
  name:string
  shipType:ShipType
  selectedShip?:ShipType
  disabled?:boolean
}

export default function Cruzadores(props:DefaultShipProps) {
    return(
      <DefaultShip {...props}>
        <div className="grid grid-rows-1 grid-cols-2 gap-0.5">
          <div className=" w-3 h-3 xl:w-6 xl:h-6 bg-amber-600 rounded-xs xl:rounded-sm shadow-sm shadow-gray-900"></div>
          <div className=" w-3 h-3 xl:w-6 xl:h-6 bg-amber-600 rounded-xs xl:rounded-sm shadow-sm shadow-gray-900"></div>
        </div>
      </DefaultShip>
    )
  }