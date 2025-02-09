import React from 'react'

import { tr } from '../../../../AppTranslate'


export function ElSignatures({ props:{user, person} }){

  const sign = [ { person, txt:tr(`IssuePerson`,user.lang) }, { person:"", txt:tr(`ReceivePerson`,user.lang) } ]

  return(
    <section className="ElSignatures flex wrap">

      {
        sign.map( (sig, i)=>{
          return(
            <div className="Signature flex column" key={`SignLine${i}`}>

              <div className='Person bold'>{sig?.person}</div>

              <div className="SignLine flex"></div>

              <div className="flex">{sig?.txt}</div>

            </div>
          )
        })
      }
      
    </section>
  )
}