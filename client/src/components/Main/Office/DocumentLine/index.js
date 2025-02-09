import React from "react"
import { Element } from 'react-scroll'

import "./DocumentLine.scss"
import { SumArray } from "../../../../AppFunctions"
import { LeftPannel } from "./LeftPannel"
import { RightPannel } from "./RightPannel"
import EditArea from "../EditArea"


function DocumentLine({ props:{company, line, l, doc, n, isSearch, visibleSide, Reducer} }) {

  const key = `DocumentLine${l}${n}`

  const color = doc?.car?.color

  const carIco = `https://bzdrive.com/files/CarIcons/${doc?.car?.brand?.replace(/[^a-zA-Z]/g, '').toLowerCase()}.svg`

  const repairStatus = doc?.status === "repair"
  const checkImg = `https://bzdrive.com/files/${repairStatus ? `ico/icoCheck.png` : `dealers/${company?.img ?? `empty.png`}`}`

  function title(){
    let lines = `--------------------------------------------------`
    let name = `${doc?.client?.name ? `klient: ${doc.client.name}\n` : ``}`
    let telNr = `${doc?.client?.contacts?.tel ? `tel: ${doc.client.contacts.tel}\n` : ``}`
    let faults = `\n${doc?.car?.faults ? `${lines}\n${doc.car.faults}\n${lines}\n` : ``}`
    let brutto = `\n${doc?.articles ? `brutto: ${SumArray(doc.articles.map( el=> el.SUM ) )} zł` : ``}`
    return `${name}${telNr}${faults}${brutto}`
  }

  function cellStyles(){
    function style(color){ return {backgroundColor:`${color}`, border:`1px solid ${color}`} }
    function statusColor(){
      switch(doc?.status) {
        case "close": return `${color}, #111a 30% 48%, #fd0 49% 51%, #111a 52% 70%, ${color})`
        case "delete": return `${color}, #111a 30% 48%, #f00 49% 51%, #111a 52% 70%, ${color})`
        default: return `${color}, #111a 30% 70%, ${color})`
      }
    }
    switch (doc?.nr?.mode) {
      case "FS": return style("#1712")
      case "PS": return style("#1712")
      case "FZ": return style("#f002")
      case "PZ": return style("#f002")
      case "ZU": return style("#fd02")
      case "VA": return style("#fd02")
      default: return {
        backgroundColor:color,
        backgroundImage:`linear-gradient(0deg, ${statusColor()}`,
        border:`1px solid ${color}`
      }
    }
  }

  function EDIT_DOC(){
    Reducer({
      type:`${doc?.editMode ? `CLOSE` : `OPEN`}_DOCUMENT`,
      isSearch, mode:doc?.nr?.mode, docID:doc?._id, lineNr:l,
      divName:`ScroolTo${doc?._id}_${l}`, offset:doc?.editMode ? 0 : 3.5
    })
  }

  const isNewDoc = doc?._id === "NewDoc"

  return(
    <Element className={`DocumentLine flex stretch wrap start ScroolTo${doc?._id}_${l}`} key={key}>

      {
        (!visibleSide?.mobile || visibleSide?.side) && !isNewDoc &&
        <LeftPannel props={{doc, color, checkImg, carIco, title, repairStatus, cellStyles, EDIT_DOC}}/>
      }

      {
        (!visibleSide?.mobile || !visibleSide?.side) && (!isNewDoc && !isSearch) &&
        <RightPannel props={{doc, color, checkImg, carIco, title, line, repairStatus, cellStyles, EDIT_DOC}}/>
      }

      { doc?.editMode && <EditArea props={{company, l, doc:doc, EDIT_DOC, Reducer}} /> }

    </Element>
  )
}

export default DocumentLine