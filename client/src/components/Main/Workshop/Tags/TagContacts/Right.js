import React from "react"

import { Info } from "./Info"


export function Right({ props:{contacts, lang} }){
  return(
    <div className="el-R flex column start">
    {
      contacts.map( (contact, i)=>{
        return(
          <div className="contact" key={`Contact${i}`}>
            <div className="txt">{`${contact.txt[lang]}:`}</div>
            {
              contact.content.link
              ?
              <a className="content"
                href={contact.content.link} target="_blank" rel="noreferrer">
                <Info props={{contact}} />
              </a>
              : 
              <div className="content">
                <Info props={{contact}} />
              </div>
            }
          </div>
        )
      })
    }
    </div>
  )
}