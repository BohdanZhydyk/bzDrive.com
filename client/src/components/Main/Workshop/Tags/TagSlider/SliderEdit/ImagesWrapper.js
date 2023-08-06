import React from "react"

import { PostToApi } from "../../../../../../AppFunctions"
import { tr } from "../../../../../../AppTranslate"
import UploadFile from "../../../../../All/UploadFile"
import { ActionBtns } from "./ActionBtns"


export function ImagesWrapper({ props:{
  user, slider, setSlider, nr, folder, folderNr, link, fileAddr, setWorkshop, setEditingText, btnL, btnR, SliderReducer
} }){

  const ADD_FILE = (data)=>{
    const file = {
      fileID: data?.fileID ?? Date.now(),
      fileAddr,
      fileName:data.name,
      fileSize:data.size,
      fileType:data.mimetype
    }
    const query = {
      updateDocFiles:true,
      // doc:{ ...doc, files:[...files, file] }
    }
    PostToApi( '/getOffice111', query, (data)=>{
      // setSave(true)
      // data?.files && setFiles(data.files)
    })
  }
  
  const btnTxt = tr(`AddFileArea`,user?.lang)
  const accept = "image/png, image/gif, image/jpeg"
  const fileProps = {btnTxt, fileAddr, accept, callback: (data)=>ADD_FILE(data)}

  return(
    <div className="ImagesWrapper flex wrap">
      
      {
        folder?.imgs.map( (image, imageNr)=>{

          const isActImg = image?.act
          const classes = `SliderImage ${isActImg ? `ActImg` : ``} flex`
          const key_k = `SliderImage${nr}${folderNr}${imageNr}`
          const imageLink = `${link}${fileAddr}${image?.img}`

          return(
            <div className={classes} key={key_k}>

              <img src={imageLink} alt="SlImg" />

              <ActionBtns props={{slider, setSlider, nr, folder, folderNr, image, imageNr, fileAddr, setWorkshop, setEditingText, btnL, btnR, SliderReducer}} />

            </div>
          )
        })
      }

      <UploadFile props={fileProps} />

    </div>
  )
}