import React, { useState } from 'react'

import FilesUpload from '../FilesUpload'
import ActionBtn from '../ActionBtn'


export function Sticker({ props:{setSoft, sw, s, setSave, link, defaultFileAddr, id, isAdmin, editCard, Reducer} }) {

  const allowedMimeTypes = ["image/jpeg"]
  const defaultFileName = `Sticker_${Date.now()}.jpg`

  const [del, setDel] = useState(false)

  const swID = sw?.id
  const fileName = sw?.ECUsticker?.name
  const fileAddr = defaultFileAddr
  const src = `${link}/${fileAddr}/${fileName}`

  function SET_STICKER(res){
    setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : { ...soft, ECUsticker: res ? res[0] : {} } ) )
    setSave(true)
  }

  function DELETE_STICKER(){
    Reducer({type:`DELETE_STICKER`, swID, fileAddr, fileName})
    setDel(prev=>false)
  }

  return (
    <div className="Sticker flex column start">

      {
        sw?.ECUsticker
        ?
        <img className="StickerImg flex" src={src} alt="label" />
        :
        <React.Fragment>
          <span className="CardLine NoSticker flex bold">{`ECU sticker`}</span>
          <span className="CardLine StickerLine flex start bold">{`ECU: ${sw?.ECUType ?? ""}`}</span>
          <span className="CardLine StickerLine flex start bold">{`HW: ${sw?.hwVersion ?? ""}`}</span>
          <span className="CardLine StickerLine flex start bold">{`SW: ${sw?.swVersion ?? ""}`}</span>
        </React.Fragment>
      }

      {
        isAdmin && editCard && id !== "new" &&
        <div className='StickerDownload flex end'>
          {
            !fileName
            ?
            <FilesUpload props={{ defaultFileAddr, defaultFileName, allowedMimeTypes, multiple:false, cb:SET_STICKER}} />
            :
            <>
              { !del && <ActionBtn props={{ name: `delete`, click:()=>setDel(prev=>true) }} /> }
              { del && <ActionBtn props={{ name: `check`, click:DELETE_STICKER }} /> }
              { del && <ActionBtn props={{ name: `cancel`, click:()=>setDel(prev=>false) }} /> }
            </>
          }
        </div>
      }
      
    </div>
  )
}
