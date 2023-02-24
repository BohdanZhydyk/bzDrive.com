import React from "react"


export function Contacts({ props:{contacts} }) {
  return (
    <div className="Contacts flex">
    {
      contacts.map( (el, n)=>{

        const src = `https://bzdrive.com/files/ico/contacts/${el.key}.png`

        return(
          <a href={el.val} target="_blank" rel="noreferrer" key={`ContEl${el.key}${n}`}>
            <img className="ImgBtn" src={src} alt={el.key} />
          </a>
        )

      })
    }
    </div>
  )
}