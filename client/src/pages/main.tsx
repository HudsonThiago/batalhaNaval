import { FaRegUser } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { JSX } from "react";

export default function Main() {

  const getMap = () => {
    const divs: JSX.Element[] = [];

    let index=0;
    
    for (let i = 1; i <= 12; i++) {
      for (let j = 1; j <= 11; j++) {
        divs.push(<div className="w-8 h-8 bg-white/100 rounded-sm shadow-sm shadow-pink-200 select-none cursor-pointer " key={index}></div>);
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
    <div className="w-full h-full flex justify-center items-center">
        <div className="bg-stone-50/10 flex flex-col gap-4 p-8 rounded-sm">
          <h2 className=" flex justify-center w-full m-auto text-[2rem] mb-8 text-white font-bold">Escolha</h2>
            {getMap()}
        </div>
    </div>
  )
}