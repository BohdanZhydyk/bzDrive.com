import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import "./SoftwareCard.scss"
import { tr } from '../../../AppTranslate'
import { GetUser } from '../../../AppFunctions'
import { modTypes, programmers, readMethods, SoftwareReducer, swTypes } from './SoftwareReducer'
import { SoftPropses } from './SoftPropses'
import InputText from '../InputText'
import InputSelect from '../InputSelect'
import { CardTopLine } from './CardTopLine'
import { Sticker } from './Sticker'
import { GroupInfo1 } from './GroupInfo1'
import { GroupInfo2 } from './GroupInfo2'
import { SoftwarePannel } from './SoftwarePannel'


function SoftwareCard({ props:{car, setCar, setSoft, sw, s, setSave, printMode, link, defaultFileAddr, isLine, setIsLine, docID} }) {

  const user = GetUser()
  const lang = user?.lang
  const isAdmin = user?.role === "admin"
  
  const [editCard, setEditCard] = useState(false)
  const [del, setDel] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const [editErr, setEditErr] = useState({})

  const {
    brand, model, ECUType, engine, swVersion, hwVersion, vin,
    programmer, swType, readMethod, mod
  } = SoftPropses({
    tr, lang, car, setCar, setSoft, sw, s, setSave, editErr, setEditErr, programmers, swTypes, readMethods, modTypes
  })

  const lines1 = [
    {classes:"Brand", props:brand, input:<InputText props={ brand }/> },
    {classes:"Model", props:model, input:<InputText props={ model }/> },
    {classes:"Engine", props:engine, input:<InputText props={ engine }/> },
    {classes:"VIN", props:vin, input:<InputText props={ vin }/> },
    {classes:"ECUType", props:ECUType, input:<InputText props={ ECUType }/> },
    {classes:"HardwareVersion", props:hwVersion, input:<InputText props={ hwVersion }/> },
    {classes:"SoftwareVersion", props:swVersion, input:<InputText props={ swVersion }/> }
  ]

  const lines2 = [
    {classes:"Programmer", props:programmer, input:<InputSelect props={ programmer }/> },
    {classes:"SoftwareType", props:swType, input:<InputSelect props={ swType }/> },
    {classes:"ReadMethod", props:readMethod, input:<InputSelect props={ readMethod }/> },
    {classes:"Modifications", props:mod, input:<InputSelect props={ mod }/> },
  ]

  const Reducer = (action)=> SoftwareReducer({action, navigate, setSave, setSoft, isLine, setIsLine, setEditErr})

  return (
    <div className="SoftwareCard flex stretch wrap">

      <CardTopLine props={{sw, printMode, defaultFileAddr, isAdmin, setIsLine, editCard, setEditCard, del, setDel, docID, Reducer}}/>

      <div className="GroupInfo flex column start">
        <Sticker props={{setSoft, sw, s, setSave, link, defaultFileAddr, id, isAdmin, editCard, Reducer}}/>
        <GroupInfo1 props={{lines1, editCard}}/>
        <GroupInfo2 props={{lines2, editCard}}/>
      </div>

      <div className="ArticlesPannel flex column start">

        <SoftwarePannel props={{setSoft, sw, s, setSave, link, defaultFileAddr, id, isAdmin, editCard, docID, Reducer}}/>

      </div>
      
    </div>
  )
}

export default SoftwareCard
