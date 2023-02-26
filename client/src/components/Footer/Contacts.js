import React from "react"


export function Contacts({ props:{contacts} }) {
  return (
    <div className="Contacts flex evenly">
    {
      contacts.map( (el, n)=>{

        const src = `https://bzdrive.com/files/ico/contacts/${el.key}.png`
        let key = `ContEl${el.key}${n}`

        return(
          <div className="ContBtn flex" key={key}>
            <a href={el.val} target="_blank" rel="noreferrer"><img className="ImgBtn" src={src} alt={el.key} /></a>
          </div>
        )

      })
    }
    </div>
  )
}