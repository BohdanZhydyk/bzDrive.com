import React from "react"

import InputText from "../../../../../All/InputText"


export function InputsWrapper({ props:{el, nr, folder, folderNr, setWorkshop, setEditingTag} }){

  const inputPropses = (folderNr, langNr)=>{
    return {
      legend: `${folder?.txt[langNr]?.name} - ${folderNr}`,
      type: `text`,
      val: folder?.txt[langNr]?.val,
      cbVal: (val)=>{
        const newEl = {
          ...el,
          body: el?.body.map( (folder, F)=>
            F !== folderNr
            ? folder
            :
            {
              ...folder,
              txt: folder?.txt.map( (lang, L)=>
                L !== langNr
                ? lang
                : {...lang, val}
              )
            }
          )
        }
        console.log(newEl)
        setWorkshop( prev=> prev?.map( (el, e)=> (e !== nr) ? el : newEl ))
        setEditingTag( prev=> newEl )
      },
      cbErr: ()=>{}
    }
  }

  return(
    <div className="InputsWrapper flex wrap">
    {
      folder?.txt.map( (lang, langNr)=>{
        return(
          <InputText props={inputPropses(folderNr, langNr)} key={`ThemeInput${nr}${folderNr}${langNr}`} />
        )
      })
    }
    </div>
  )
}