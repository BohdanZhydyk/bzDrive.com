import React from "react"

import DocumentLine from "../../DocumentLine"


export function WeekDocs({ props:{company, line, l, visibleSide, Reducer} }) {

  return(
    <React.Fragment>
    
    {
      line?.docs.map( (doc, n)=>{
        return <DocumentLine props={{company, line, l, doc, n, visibleSide, Reducer}} key={doc._id} />
      })
    }

    </React.Fragment>
  )
}