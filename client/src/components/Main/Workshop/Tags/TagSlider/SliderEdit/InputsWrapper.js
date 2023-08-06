import React from "react"

import Input from "../../../../../All/Input"


export function InputsWrapper({ props:{slider, folder, nr, folderNr, setWorkshop, setEditingText} }){

  const inputPropses = (folderNr, langNr)=>{
    return {
      legend: `${folder?.txt[langNr]?.name} - ${folderNr}`,
      type: `text`,
      val: folder?.txt[langNr]?.val,
      cbVal: (val)=>{
        setWorkshop( prev=> prev?.map( (tag, t)=>
          t !== nr
          ? tag
          :
          {
            ...tag,
            body: tag?.body.map( (folder, F)=>
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
        ))
        setEditingText(prev=>true)
      },
      cbErr: ()=>{}
    }
  }

  return(
    <div className="InputsWrapper flex wrap">
    {
      folder?.txt.map( (lang, langNr)=>{
        return(
          <Input props={inputPropses(folderNr, langNr)} key={`ThemeInput${nr}${folderNr}${langNr}`} />
        )
      })
    }
    </div>
  )
}