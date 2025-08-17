import React from 'react'

import FilesUpload from '../FilesUpload'
import { SoftwareLine } from './SoftwareLine'


export function SoftwarePannel({ props:{setSoft, sw, s, setSave, link, defaultFileAddr, id, role, editCard, docID, Reducer} }) {

  function SET_SOFTWARE_FILES(res){
    setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : {...soft, files: soft?.files ? [...soft?.files, ...res] : res} ) )
    setSave(true)
  }

  function moveSoftware(fromIndex, toIndex){
    if (fromIndex === toIndex) return;
    setSoft(prev => prev.map((soft, i) => {
      if (i !== s) return soft;
      const newFiles = [...soft.files];
      const [movedItem] = newFiles.splice(fromIndex, 1);
      newFiles.splice(toIndex, 0, movedItem);
      return {...soft, files: newFiles};
    }));
    setSave(true);
  }

  const isAdmin = role === "admin"

  return (
    <div className="SoftwarePannel flex column start">

      <div className="SoftWareTopLine flex start bold">
        Files
      </div>

      {
        (sw?.files?.length > 0) &&
        <div className="SoftWareLines flex column start">
          {
            sw.files.map( (software, n)=>{
              const key = `SoftWareLine${n}`
              const props = {sw, software, link, defaultFileAddr, id, role, editCard, docID, n, moveSoftware, Reducer}
              return <SoftwareLine props={props} key={key} />
            })
          }
        </div>
      }
      
      <div className="UploadBtns flex stretch end">
      {
        isAdmin && editCard && id !== "new" &&
        <FilesUpload props={{defaultFileAddr, multiple:true, cb:SET_SOFTWARE_FILES}} />
      }
      </div>
      
    </div>
  )
}