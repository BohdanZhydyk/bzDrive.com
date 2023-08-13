import React from "react"

import { PostToApi } from "../../../../../../AppFunctions"
import { tr } from "../../../../../../AppTranslate"
import UploadFile from "../../../../../All/UploadFile"
import { ActionBtns } from "./ActionBtns"


export function ImagesWrapper({ props:{
  el, nr, user, slider, setSlider, folder, folderNr, link,
  fileAddr, setWorkshop, setEditingTag, dirBtns, SliderReducer
} }){

  const ADD_FILE = (data)=>{
    const newEl = {
      ...el,
      body:el?.body.map( (folder, F)=>
        F !== folderNr
        ? folder
        :
        { ...folder, imgs:[...folder?.imgs, {img:data.name}] }
      )
    }
    const query = { setWorkshop:true, tag:newEl }
    PostToApi( '/getWorkshop', query, (data)=>{
      setWorkshop(data?.workshop)
      setEditingTag( prev=> newEl )
    })
  }
  
  const btnTxt = tr(`AddFileArea`,user?.lang)
  const formNr = folderNr
  const uniqueName = true
  const warning = `(1200 x 500)`
  const accept = "image/png, image/gif, image/jpeg"
  const fileProps = {btnTxt, formNr, fileAddr, uniqueName, warning, accept, callback: (data)=>ADD_FILE(data)}

  return(
    <div className="ImagesWrapper flex wrap">
      
      {
        folder?.imgs.map( (image, imageNr)=>{

          const isActImg = image?.act
          const classes = `SliderImage ${isActImg ? `ActImg` : ``} flex`
          const key_k = `SliderImage${nr}${folderNr}${imageNr}`
          const imageLink = `${link}${fileAddr}${image?.img}`
          const actBtnsProps = {el, nr, slider, setSlider, folder, folderNr, image, imageNr, fileAddr, setWorkshop, setEditingTag, dirBtns, SliderReducer}

          return(
            <div className={classes} key={key_k}>

              <img src={imageLink} alt="SlImg" />

              <ActionBtns props={actBtnsProps} />

            </div>
          )
        })
      }

      <UploadFile props={fileProps} key={`uplf${folderNr}`}/>

    </div>
  )
}