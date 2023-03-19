import React from 'react'

import { tr } from '../../../../AppTranslate'


export function ElSignatures({ props:{user} }){

  const sign = [ tr(`IssuePerson`,user.lang), tr(`ReceivePerson`,user.lang) ]

  return(
    <section className="ElSignatures flex wrap">

      {
        sign.map( (sig, i)=>{

          return(
            <div className="Signature flex column" key={`SignLine${i}`}>

              <div className="SignLine flex"></div>

              <div className="flex">{sig}</div>

            </div>
          )
        })
      }
      
    </section>
  )
}