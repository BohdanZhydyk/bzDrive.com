import React, { useState } from 'react'

import ActionBtn from '../ActionBtn'
import { bzBytesCalc } from '../../../AppFunctions'


export function SoftwareLine({ props:{sw, soft, link, defaultFileAddr, id, isAdmin, editCard, Reducer} }) {

  const [del, setDel] = useState(false)

  const swID = sw?.id
  const fileID = soft?.fileID
  const fileName = soft?.name
  const fileAddr = defaultFileAddr

  const href = `${link}/${defaultFileAddr}/${soft?.name}`
  const softSize = bzBytesCalc(soft?.size)
  const size = `${softSize?.num} ${softSize?.unit}`

  function DELETE_SOFT(){
    Reducer({type:`DELETE_SOFT`, swID, fileID, fileAddr, fileName})
    setDel(prev=>false)
  }

  return (
    <div className="SoftwareLine flex" >

      <a className="FileName flex start" href={href} target="_blank" rel="noopener noreferrer">
        {soft?.name}
      </a>

      { !del && <span className="FileSize flex end">{size}</span> }

      {
        isAdmin && editCard && id !== "new" &&
        <>
          { !del && <ActionBtn props={{ name: `delete`, click:()=>setDel(prev=>true) }} /> }
          { del && <ActionBtn props={{ name: `check`, click:DELETE_SOFT }} /> }
          { del && <ActionBtn props={{ name: `cancel`, click:()=>setDel(prev=>false) }} /> }
        </>
      }

    </div>
  )
}
