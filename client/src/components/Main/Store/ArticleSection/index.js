import React from "react"

import "./ArticleSection.scss"
import { Article } from "./Article"


function ArticleSection({ props:{store, tr, lang, ADD_TO_CART} }){
  return(
    <section className="ArticleSection flex stretch wrap">
    {
      store && store?.map( (article, a)=>{
        return(
          <Article props={{article, a, tr, lang, ADD_TO_CART}} key={`ArticleCard${a}`}/>
        )
      })
    }
    </section>
  )
}

export default ArticleSection