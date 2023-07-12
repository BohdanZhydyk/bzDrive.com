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

  const [partner, setPartner] = useState(false)
  const [partners, setPartners] = useState(false)

  const [editErr, setEditErr] = useState(false)
  const [save, setSave] = useState(false)

  const CHG_CL = (pa)=>{
    setEditErr( (prev)=> ({...prev, NIP:pa?.msg}) )
    setPartner(pa?.partnerData)
  }

  useEffect( ()=>{
    
    if(nip?.length === 13){

      setPartner( (prev)=> false )
      setPartners( (prev)=> false )
      setEditErr( (prev)=> ({...prev, NIP:""}) )

      GET_NIP(nip, "client", (data)=>{
        setEditErr( (prev)=> ({...prev, NIP:data[0]?.msg}) )
        setPartner( (prev)=> ({...prev, ...data[0]?.partnerData}) )
        setPartners( (prev)=> data )
      })

    }
    else{
      setPartner( (prev)=> false )
      setPartners( (prev)=> false )
    }

  },[nip])

  const partnerPr  = ClientPropses(tr, lang, partner, setPartner, editErr, setEditErr, setSave)

  // console.log("clients", clients)
  // console.log("msg", msg)

  return(  
    <div className="NIPinfo flex stretch  end wrap">

      {
        partners.length > 0 && partners.map( (pa, p)=>{
          const key = `ChgPartnerBtn${p}`
          return (pa?.msg !== editErr?.NIP)
          ? <div className="ChgPartnerBtn flex" onClick={()=>CHG_CL(pa)} key={key}>{pa?.msg}</div>
          : <div key={key}></div>
        })
      }

      <div className="NIPinput flex">
        <Input props={nipPropses(nip, setNip, partner, setPartner, editErr, setEditErr)}/>
      </div>

      {
        partner &&
        <section className="ElInfo flex end">
          <InfoPannel props={{lang, title:`InfoPannelClient`, InfoProps:partnerPr}} />
        </section>
      }

    </div>
  )
}

export default NIPinfo