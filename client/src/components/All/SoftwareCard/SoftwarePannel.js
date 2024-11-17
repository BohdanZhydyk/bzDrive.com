import React from 'react'

import FileUpload from '../FileUpload'
import { SoftwareLine } from './SoftwareLine'


export function SoftwarePannel({ props:{setSoft, sw, s, setSave, link, defaultFileAddr, id, role, editCard, docID, Reducer} }) {

  function SET_SOFTWARE_FILES(res){
    setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : {...soft, files: soft?.files ? [...soft?.files, res] : [res]} ) )
    setSave(true)
  }

  const isAdmin = role === "admin"

  return (
    <div className="SoftwarePannel flex column start">

      <div className="SoftWareTopLine flex start bold">
        Pliki
      </div>

      {
        (sw?.files?.length > 0) &&
        <div className="SoftWareLines flex column start">
          {
            sw.files.map( (software, n)=>{
              const key = `SoftWareLine${n}`
              const props = {sw, software, link, defaultFileAddr, id, role, editCard, docID, Reducer}
              return <SoftwareLine props={props} key={key} />
            })
          }
        </div>
      }
      
      <div className="UploadBtns flex stretch end">
      {
        isAdmin && editCard && id !== "new" &&
        <FileUpload props={{defaultFileAddr, cb:SET_SOFTWARE_FILES}} />
      }
      </div>
      
    </div>
  )
}
