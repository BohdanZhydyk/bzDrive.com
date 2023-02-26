import React from "react"

import "./TagContacts.scss"


export function Info({ props:{contact} }){
  return(
    <section className="line flex between stretch">
      <img className="ImgBtn" src={contact.content.img} alt={contact.element} />
      <div className="contentTxt flex end wrap">
      {
        contact.content.txt.map( (txt, n)=>{
          return(
            <div className="el flex end" key={`ContTxt${contact.element + n}`}>
              {txt}
            </div>
          )
        })
      }
      </div>
    </section>
  )
}