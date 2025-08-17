import React from "react"
import { StateLineBody } from "./StateLineBody"
import { LineDelete } from "./LineDelete"
import { StatLinks } from "./StatLinks"


function StatTable({ props:{statistic, from, to, Reducer} }) {

  const tableTop = { nr:"Nr", logins:[{user:"User"}], IP:{ip:"IP", city:"City", country_name:"Country", asn_org:"ASN"} }

  return (
    <div className="StatTable flex column">
    {
      statistic && [ tableTop, ...statistic ].map((entry, i) => {

        return entry?.logins.map((login, j) => {

          const key = `${login?.lastUnix}-${j}`
          const classes = i === 0 ? `TopLine` : `Cell`

          return (
            <div className="StatLine flex stretch wrap" key={key}>
              
              <StateLineBody props={{entry, login, i, j, classes, Reducer}}/>

              <LineDelete props={{entry, login, i, classes, from, to, Reducer}}/>

              { login?.open && <StatLinks props={{login, i, j}}/> }

            </div>
          )
        })

      })
    }
    </div>
  )
}

export default StatTable
