import React, { useEffect, useState } from "react"

import "./ArticleInfo.scss"
import { PostToApi } from "../../../../AppFunctions"
import { ArtSlider } from "./ArtSlider"
import BuyPannel from "../BuyPannel"
import SiteIcon from "../../../All/SiteIcon"


function ArticleInfo({ props:{tr, lang, ADD_TO_CART} }){
  
  const currentPath = window.location.pathname.split("/")
  const articleID = currentPath[currentPath.length - 1]

  const [art, setArt] = useState(false)

  const id = art?.id
  const name = art?.name ?? ""
  const imgs = art?.imgs ?? []
  const price = art?.price ?? "0.00"
  const quantity = art?.quantity ?? 0
  const description = art?.description ?? ""
  
  const query = {getArticle:true, articleID}
  useEffect( ()=>{ PostToApi( '/getStore', query, (data)=> setArt(data) ) }, [articleID])

  // console.log("art", art)
  
  return(
    <div className="ArticleInfo flex">

      {
        !art
        ?
        <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
        :
        <div className="ArticleInfoPannel flex stretch wrap">

          <div className="ArticleName overflow bold flex start">{name}</div>
          
          <ArtSlider props={{imgs}}/>

          <div className="ArtDescription flex column start">

            <div className="TopPannel flex stretch">

              <div className="EmptyPannel flex"></div>

              <div className="BuyPannelWrapper flex end">
                <BuyPannel props={{id, quantity, price, tr, lang, ADD_TO_CART}}/>
              </div>

            </div>

            {
              description.split("\n").map( (paragraph, n)=>{
                const key = `Paragraph${articleID}${n}`
                return(
                  <p key={key}>{paragraph}</p>
                )
              })
            }
          </div>

        </div>
      }

      

    </div>
  )
}

export default ArticleInfo