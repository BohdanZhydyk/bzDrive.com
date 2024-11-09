import React from 'react'


export function GroupInfo2({ props:{lines2, editCard} }) {

  return (
    <React.Fragment>
    {
      lines2?.map( (line, l)=>{
        return(
          <React.Fragment key={`Lines2${l}`} >
          {
            editCard
            ?
            line?.input
            :
            <span className={`${line?.classes} CardLine flex start`}>
              <span className="Description flex start">{`${line?.props?.legend}:`}</span>
              <span className="Value flex start bold">{line?.props?.val}</span>
            </span>
          }
          </React.Fragment>
        )
      })
    }

    </React.Fragment>
  )
}
