import React from "react"

import "./Articles.scss"
import { Article } from "./Article"


function Articles({ props:{store, tr, user, StoreFn} }){
  return(
    <section className="Articles flex stretch wrap">
    {
      store && store?.map( (article, a)=>{
        return(
          <Article props={{article, a, tr, user, StoreFn}} key={`ArticleCard${a}`}/>
        )
      })
    }
    </section>
  )
}

export default Articles