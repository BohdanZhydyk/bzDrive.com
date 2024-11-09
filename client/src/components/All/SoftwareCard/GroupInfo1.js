import React from 'react'


export function GroupInfo1({ props:{lines1, editCard} }) {
  return (
    <React.Fragment>
    {
      lines1?.map( (line, l)=>{
        return(
          <React.Fragment key={`Lines1${l}`} >
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
