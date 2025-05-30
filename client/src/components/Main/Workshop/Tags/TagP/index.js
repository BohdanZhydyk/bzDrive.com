import React, { useState } from "react"

import "./TagP.scss"
import { tr } from "../../../../../AppTranslate"
import TextArea from "../../../../All/TextArea"
import UploadFile from "../../../../All/UploadFile"
import { PostToApi } from "../../../../../AppFunctions"


function TagP({ props:{el, nr, user, setWorkshop, editMode, editingTag, setEditingTag} }){

  const [edit, setEdit] = useState(false)

  function CLICK(){
    if(editMode && !editingTag){
      setEdit(prev=>true)
      setEditingTag( prev=>el )
    }
  }

  const textAreaPropses = (par, p, lan)=>{
    return {
      plhol: tr(`PlaceHolder`,user?.lang),
      val: par[lan],
      cbVal: (val)=>{
        const newEl = {
          ...el,
          body:{
            ...el?.body,
            txt:el?.body?.txt.map( (text, t)=>
              t !== p ? text : {...text, [lan]:val}
            )
          }
        }
        setWorkshop( prev=> prev?.map( (el, e)=> (e !== nr) ? el : newEl ))
        setEditingTag( prev=> newEl )
      },
      cbErr: ()=>{}
    }
  }

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
  const fileAddr = "https://bzdrive.com/files/"
  const accept = "image/png, image/gif, image/jpeg"
  const fileProps = {btnTxt, fileAddr, accept, callback: (data)=>ADD_FILE(data)}

  return(
    <div className={`${editMode ? `AdminBorder` : `Border`} flex`} onClick={CLICK}>

      <div className="TagP flex stretch" onClick={CLICK}>
      {
        !edit
        ?
        <div className="PWrapper flex stretch">

          {
            el?.body?.startImg &&
            <div className="ImgArea flex column start">
              <img src={el.body.startImg} alt="tagImg" />
            </div>
          }

          <div className="ParagraphArea flex column start">
            {
              el?.body?.txt.map( (par, p)=>
                <p key={`ParagraphLine${nr}${p}`}>{par[user?.lang]}</p>
              )
            }
          </div>

          {
            el?.body?.endImg &&
            <div className="ImgArea flex column start">
              <img src={el.body.endImg} alt="tagImg" />
            </div>
          }

        </div>
        :
        <div className="PEditWrapper flex column">

          <div className="BeforeImg flex">

            {
              el?.body?.startImg &&
              <div className="ImgArea flex column start">
                <img src={el.body.startImg} alt="tagImg" />
              </div>
            }

            <UploadFile props={fileProps} />

          </div>

          {
            el?.body?.txt.map( (par, p)=>{
              return(
                <div className="ParagraphWrapper flex column" key={`ParagraphWrapper${nr}${p}`}>

                  {
                    ["en","ua","pl"]?.map( (lan, l)=>{
                      return(
                        <div className="TextAreaWrapper flex column" key={`TextAreaWrapper${nr}${p}${l}`}>
                          <TextArea props={textAreaPropses(par, p, lan)} />
                        </div>
                      )
                    })
                  }

                </div>
              )
            })
          }

          <div className="AfterImg flex">

            {
              el?.body?.endImg &&
              <div className="ImgArea flex column start">
                <img src={el.body.endImg} alt="tagImg" />
              </div>
            }

            <UploadFile props={fileProps} />

          </div>

        </div>
      }
      </div>

    </div>
  )
}

export default TagP