import { useEffect, useState } from "react";
import { FiAlertTriangle, FiAlertCircle, FiInfo  } from "react-icons/fi";
import { VscVerified } from "react-icons/vsc";

type alertType = "INFO" | "SUCCESS" | "ALERT" | "DANGER";
interface alertProps {
    title?:string
    message:string
    visible:boolean
    alertType:alertType
    setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

interface alertTypeProps {
  label:alertType
  title:string
  color:string
  icon:React.ReactNode;
}

export default function Alert({title, message, alertType="DANGER", visible, setVisible}:alertProps) {
  const [type, setType] = useState<alertTypeProps>({label: "DANGER", title: "Erro", color:"red", icon:<FiAlertCircle className=" text-lg text-red-200 col-span-1 " />})

  useEffect(()=>{
    getType(alertType)
    setTimeout(()=>{
      setVisible(false)
    }, 6000)
  }, [])

  const getType=(alertType:alertType)=>{
    if(alertType == "INFO") {
      setType({label: "INFO", title: "Informação", color:"blue", icon:<FiInfo className=" text-lg text-blue-200 col-span-1 " />})
    } else if(alertType == "SUCCESS") {
      setType({label: "SUCCESS", title: "Sucesso", color:"green", icon:<VscVerified className=" text-lg text-green-200 col-span-1 " />})
    } else if(alertType == "ALERT") {
      setType({label: "ALERT", title: "Atenção", color:"amber", icon:<FiAlertTriangle className=" text-lg text-amber-200 col-span-1 " />})
    } else if(alertType == "DANGER") {
      setType({label: "DANGER", title: "Erro", color:"red", icon:<FiAlertCircle className=" text-lg text-red-200 col-span-1 " />})
    } else {
      setType({label: "DANGER", title: "Erro", color:"red", icon:<FiAlertCircle className=" text-lg text-red-200 col-span-1 " />})
    }
  }

  const alertBar=()=>{
    return (
      type && (
        <div onClick={()=>setVisible(false)} className={`min-w-[500px] min-h-20 border-l-8 p-2 pl-6 box-border border-amber-200 bg-linear-to-r from-amber-50/10 to-amber-50/60  rounded-sm mt-8 ml-4 grid grid-cols-[30px_calc(100%_-_30px)] items-center cursor-pointer ${visible?'visible':'hidden'}`}>
          {type?.icon}
          <p className={`col-start-2 font-bold text-lg text-amber-200`}>{title?title:type?.title}</p>
          <p className={`col-start-2 text-amber-50 text-sm`}>{message}</p>
        </div>
      )
    )
  }

  return (
    alertBar()
  )
}