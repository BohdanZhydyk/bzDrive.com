import React, { useEffect, useState } from "react"

import "./NIPinfo.scss"
import "../EditArea/ElInfo/ElInfo.scss"
import { tr } from "../../../../AppTranslate"
import { GetUser } from "../../../../AppFunctions"
import Input from "../../../All/Input"
import { GET_NIP, nipPropses } from "./NIPinfoLogic"
import { ClientPropses } from "../EditArea/ElInfo/propses"
import { InfoPannel } from "../EditArea/ElInfo/InfoPannel"


function NIPinfo({ props:{} }){

  const lang = GetUser().lang

  const [nip, setNip] = useState(false)

  const [client, setClient] = useState(false)
  const [clients, setClients] = useState(false)

  const [editErr, setEditErr] = useState(false)
  const [save, setSave] = useState(false)

  const CHG_CL = (cl)=>{
    setEditErr( (prev)=> ({...prev, NIP:cl?.msg}) )
    setClient(cl?.clientData)
  }

  useEffect( ()=>{
    
    if(nip?.length === 13){

      setClient( (prev)=> false )
      setClients( (prev)=> false )
      setEditErr( (prev)=> ({...prev, NIP:""}) )

      GET_NIP(nip, clients[0], (data)=>{
        setEditErr( (prev)=> ({...prev, NIP:data[0]?.msg}) )
        setClient( (prev)=> ({...prev, ...data[0]?.clientData}) )
        setClients( (prev)=> data )
      })

    }
    else{
      setClient( (prev)=> false )
      setClients( (prev)=> false )
    }

  },[nip])

  const ClientPr  = ClientPropses(tr, lang, client, setClient, editErr, setEditErr, setSave)

  // console.log("clients", clients)
  // console.log("msg", msg)

  return(  
    <div className="NIPinfo flex stretch end wrap">

      {
        clients.length > 0 && clients.map( (cl, c)=>{
          const key = `ChgClientBtn${c}`
          return (cl?.msg !== editErr?.NIP)
          ? <div className="ChgClientBtn flex" onClick={()=>CHG_CL(cl)} key={key}>{cl?.msg}</div>
          : <div key={key}></div>
        })
      }

      <div className="NIPinput flex">
        <Input props={nipPropses(nip, setNip, client, setClient, editErr, setEditErr)}/>
      </div>

      {
        client &&
        <section className="ElInfo flex end">
          <InfoPannel props={{lang, title:`InfoPannelClient`, InfoProps:ClientPr}} />
        </section>
      }

    </div>
  )
}

export default NIPinfo