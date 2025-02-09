import React from "react"


export function Contacts({ props:{contacts} }) {
  return (
    <div className="Contacts flex evenly">
    {
      contacts.map( (el, n)=>{

        const src = `https://bzdrive.com/files/ico/contacts/${el.key}.png`
        let key = `ContEl${el.key}${n}`

        return(
          <a className="ContBtn flex" href={el.val} target="_blank" rel="noreferrer" key={key}>
            <img className="ImgBtn" src={src} alt={el.key} />
          </a>
        )

      })
    }
    </div>
  )
}
