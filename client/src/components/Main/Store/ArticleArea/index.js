import React from "react"

import "./ArticleArea.scss"
import { Article } from "./Article"


function ArticleArea({ props:{store, tr, lang} }){
  return(
    <div className="ArticleArea flex stretch wrap">
    {
      store && store?.map( (art, a)=>{
        return(
          <Article props={{art, a, tr, lang}} key={`ArticleCard${a}`}/>
        )
      })
    }
    </div>
  )
}

export default ArticleArea