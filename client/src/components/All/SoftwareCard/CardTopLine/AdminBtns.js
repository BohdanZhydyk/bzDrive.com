import React from 'react'

import ActionBtn from '../../ActionBtn'


export function AdminBtns({
  props: {sw, printMode, defaultFileAddr, isAdmin, setIsLine, editCard, setEditCard, del, setDel, docID, Reducer}
}) {
  
  const editPropses = { name:`edit`, click:()=>{ setEditCard(prev=>!prev) } }
  const deletePropses = { name:"delete", click:()=>setDel(true) }
  const cancelDeletePropses = { name:"cancel", click:()=>setDel(false) }
  const cancelPropses = { name: `cancel`, click:()=>setIsLine(prev=>!prev) }
  const checkPropses = { name:"check", click:()=>{
    setIsLine(prev=>!prev)
    Reducer({type:`DELETE_SOFTWARE_FOLDER`, swID:sw?.id, folderAddr:defaultFileAddr})
  }}

  return (
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
  )
}
