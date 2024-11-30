import React, { useState } from 'react'

import ActionBtn from '../ActionBtn'
import { bzBytesCalc } from '../../../AppFunctions'


export function SoftwareLine({ props:{sw, software, link, defaultFileAddr, id, role, editCard, docID, Reducer} }) {

  const [more, setMore] = useState(false)
  const [del, setDel] = useState(false)

  const isAdmin = role === "admin"
  const isGuest = !role || role === "guest"

  const swID = sw?.id
  const fileID = software?.fileID
  const fileName = software?.name
  const fileAddr = defaultFileAddr

  const href = `${link}/${defaultFileAddr}/${software?.name}`
  const softSize = bzBytesCalc(software?.size)
  const size = `${softSize?.num} ${softSize?.unit}`

  function DELETE_SOFT(){
    Reducer({type:`DELETE_SOFT`, swID, fileID, fileAddr, fileName})
    setDel(prev=>false)
    setMore(prev=>false)
  }

  return (
    <div className="SoftwareLine flex" >

      {
        (docID && !isAdmin)
        ?
        <div className="FileName flex start overflow" >
          {software?.name}
        </div>
        :
        <a className="FileName flex start overflow" href={href} target="_blank" rel="noopener noreferrer">
          {software?.name}
        </a>
      }

      { !more && <span className="FileSize flex end">{size}</span> }

      {
        !isGuest && !editCard &&
        <a className="flex" href={href} download={software?.name} target="_blank" rel="noreferrer">
          <ActionBtn props={{name:"download", click:()=>{}}} />
        </a>
      }

      {
        isAdmin && editCard && id !== "new" &&
        <>

          {
            more && !del &&
            <a className="flex" href={href} download={software?.name} target="_blank" rel="noreferrer">
              <ActionBtn props={{name:"download", click:()=>setMore(prev=>false)}} />
            </a>
          }

          { more && del && <ActionBtn props={{ name: `check`, click:DELETE_SOFT }} /> }
          { more && del && <ActionBtn props={{ name: `cancel`, click:()=>setDel(prev=>false) }} /> }
          { more && !del && <ActionBtn props={{ name: `delete`, click:()=>setDel(prev=>true) }} /> }

          <ActionBtn props={{name:"more", click:()=>setMore(prev=>!prev)}} />

        </>
      }

    </div>
  )
}
