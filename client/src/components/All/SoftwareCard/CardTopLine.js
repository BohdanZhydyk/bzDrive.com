import React from 'react'

import ActionBtn from '../ActionBtn'


export function CardTopLine({
  props: {car, sw, printMode, defaultFileAddr, isAdmin, setIsLine, editCard, setEditCard, del, setDel, docID, Reducer}
}) {

  const progIcon = `https://bzdrive.com/files/ico/Prog ${sw?.programmer}.png`
  const alt = `${sw?.programmer}`

  const brand = car?.brand?.length ? car.brand : "brand"
  const model = car?.model?.length ? car.model : "model"
  const ECUType = sw?.ECUType?.length ? sw.ECUType :  "ECUType"
  const title = `${brand} ${model} ${ECUType}`
  
  const editPropses = { name:`edit`, click:()=>{ setEditCard(prev=>!prev) } }
  const deletePropses = { name:"delete", click:()=>setDel(true) }
  const cancelDeletePropses = { name:"cancel", click:()=>setDel(false) }
  const cancelPropses = { name: `cancel`, click:()=>setIsLine(prev=>!prev) }
  const checkPropses = { name:"check", click:()=>{
    setIsLine(prev=>!prev)
    Reducer({type:`DELETE_SOFTWARE_FOLDER`, swID:sw?.id, folderAddr:defaultFileAddr})
  }}

  return (
    <div className="CardTopLine flex stretch">

      <div className="Title flex start bold">

        <div className="IcoProgrammer flex">
          { sw?.programmer && <img src={progIcon} alt={alt} /> }
        </div>

        <span>{title}</span>
        
      </div>

      <div className="IDsection flex column start">

        {
          sw?.id &&
          <div className="CardID txtGry flex end">
            <span>{`ID: ${sw?.id ?? ""}`}</span>
          </div>
        }

        <div className="AdminBtns flex end wrap">
          {
            docID && isAdmin &&
            <a className="flex" href={`/document/${docID}`} target="_blank" rel="noreferrer" >
              <ActionBtn props={{name:'link', click:()=>{}}} />
            </a>
          }
        {
          !printMode && !docID &&
          <>
            { !del && <ActionBtn props={deletePropses} /> }
            { !editCard && !del && <ActionBtn props={editPropses} /> }
            { !del && <ActionBtn props={cancelPropses} /> }
            { del && <ActionBtn props={checkPropses} /> }
            { del && <ActionBtn props={cancelDeletePropses} /> }
          </>
        }
        </div>

      </div>

    </div>
  )
}
