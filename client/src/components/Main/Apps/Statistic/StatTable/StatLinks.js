import React from "react"


export function StatLinks({ props:{login, i, j} }) {
  return (
    <div className="StatLinks flex stretch wrap">
    {
      login?.links.map( (link, l)=>{

        const path = link?.path
        const count = link?.count
        const key = `${login?.lastUnix}-${i}${j}${l}`

        return(
          <div className="StatLink flex" key={key}>
            {`${path}-${count}`}
          </div>
        )
      })
    }
    </div>
  )
}
