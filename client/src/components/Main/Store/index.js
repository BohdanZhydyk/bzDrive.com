import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"

import "./Store.scss"
import { tr } from "../../../AppTranslate"
import { GetUser, PostToApi } from "../../../AppFunctions"
import SiteIcon from "../../All/SiteIcon"
import ArticleArea from "./ArticleArea"
import ArticleInfo from "./ArticleInfo"


function Store({ props:{} }){

  const {lang, role} = GetUser()
  const isAdmin = role === "admin"

  const [store, setStore] = useState(false)
  
  const query = {getArticles:true}
  useEffect( ()=>{
    !store &&
    PostToApi( '/getStore', query, (data)=>{
      setStore( isAdmin ? [{"id": "new"}, ...data] : data )
    })
  }, [])

  // console.log("store",store)

  return(
    <div className="Store flex column">

      {
        !store
        ?
        <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
        :
        <>

          <section className="CommingSoon Radius flex column">
            <div>{tr("StoreWarning_1", lang)}</div>
            <div>{tr("StoreWarning_2", lang)}</div>
            <div>{tr("StoreWarning_3", lang)}</div>
          </section>
          
          <Routes>
            <Route path="/"     exact element={<ArticleArea props={{store, tr, lang}}/>} />
            <Route path="/article/*"  element={<ArticleInfo />} />
          </Routes>

        </>
      }
      
    </div>
  )
}

export default Store