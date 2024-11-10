import React from 'react'

import FileUpload from '../FileUpload'
import { SoftwareLine } from './SoftwareLine'


export function SoftwarePannel({ props:{setSoft, sw, s, setSave, link, defaultFileAddr, id, isAdmin, editCard, docID, Reducer} }) {

  function SET_SOFTWARE_FILES(res){
    setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : {...soft, files: soft?.files ? [...soft?.files, res?.data] : [res?.data]} ) )
    setSave(true)
  }

  return (
    <div className="SoftwarePannel flex column start">

      <div className="SoftWareTopLine flex start bold">
        Pliki
      </div>

      {
        (sw?.files?.length > 0) &&
        <div className="SoftWareLines flex column start">
          {
            sw.files.map( (soft, n)=>{
              const key = `SoftWareLine${n}`
              const props = {sw, soft, link, defaultFileAddr, id, isAdmin, editCard, docID, Reducer}
              return <SoftwareLine props={props} key={key} />
            })
          }
        </div>
      }
      
      {
        isAdmin && editCard && id !== "new" &&
        <FileUpload props={{defaultFileAddr, cb:SET_SOFTWARE_FILES}} />
      }
      
    </div>
  )
}
