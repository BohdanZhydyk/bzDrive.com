import React, { useState } from "react"

import "./ArticleInfo.scss"
import { ArtSlider } from "./ArtSlider"
import BuyPannel from "../BuyPannel"
import ActionBtn from "../../../All/ActionBtn"
import Input from "../../../All/Input"
import { decriptionPropses, namePropses, pricePropses, quantityPropses } from "./ArticleProps"
import TextArea from "../../../All/TextArea"


function ArticleInfo({ props:{article, a, tr, user, StoreFn, SHOW_ART} }){
  
  const currentPath = window.location.pathname.split("/")
  const articleID = currentPath[currentPath.length - 1]

  const [art, setArt] = useState(article)

  const [editErr, setEditErr] = useState(false)
  const [edit, setEdit] = useState( art?.ID === "new" && user?.role === "admin" ? "editing" : "admin")
  const [save, setSave] = useState(false)

  function SAVE_ART(art){
    SHOW_ART(false)
    const query = {saveArticle:true, art}
    StoreFn({type:"SAVE_ART", query})
  }

  const editBtnProps = { name:"edit", click:()=>setEdit(prev=>"editing") }
  const saveBtnProps = { name:"save", click:()=>SAVE_ART(art) }
  const cancelBtnProps = { name:"cancel", click:()=>SHOW_ART(false) }

  const ID = art?.ID
  const name = art?.ART ?? ""
  const IMG = art?.IMG ?? []
  const PRI = art?.PRI ?? "0.00"
  const QUA = art?.QUA ?? 0
  const DSC = art?.DSC ?? ""

  // console.log("art", art)
  
  return(
    <div className="ArticleInfo Radius BoxShadow flex stretch wrap">

      <div className="ArticleName flex between">
        {
          edit !== "editing"
          ? <div className="ArticleNameTxt overflow bold flex start">{name}</div>
          : <Input props={namePropses(art, setArt, editErr, setEditErr, setSave)}/>
        }
        {
          edit === "admin"
          ? <ActionBtn props={editBtnProps}/>
          : save && <ActionBtn props={saveBtnProps}/>
        }
        <ActionBtn props={cancelBtnProps}/>
      </div>
      
      <ArtSlider props={{IMG}}/>

      <div className="ArtDescription flex column start">

        <div className="TopPannel flex stretch">

          <div className="EmptyPannel flex"></div>

          <div className="BuyPannelWrapper flex end">
            {
              edit !== "editing"
              ? <BuyPannel props={{ID, QUA, PRI, tr, user, StoreFn}}/>
              :
              <>
                <Input props={quantityPropses(art, setArt, editErr, setEditErr, setSave)}/>
                <Input props={pricePropses(art, setArt, editErr, setEditErr, setSave)}/>
              </>
            }
          </div>

        </div>

        {
          edit !== "editing"
          ?
          DSC.split("\n").map( (paragraph, n)=>{
            const key = `Paragraph${articleID}${n}`
            return(
              <p key={key}>{paragraph}</p>
            )
          })
          :
          <TextArea props={decriptionPropses(art, setArt, editErr, setEditErr, setSave)}/>
        }

      </div>

    </div>
  )
}

export default ArticleInfo