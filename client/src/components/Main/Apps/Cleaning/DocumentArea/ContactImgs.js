import React from "react"


export function ContactImgs({ props:{job} }) {

  const addr = job?.client?.addr
  const zip = addr?.zip
  const town = addr?.town
  const street = addr?.street
  const nr = addr?.nr

  const contacts = job?.client?.contacts
  const www = contacts?.www
  const email = contacts?.email
  const tel = contacts?.tel
  
  const googleMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street} ${nr}, ${town}, ${zip}`)}`

  const contactImgs = [
    { key: "web", val: www },
    { key: "map", val: googleMaps },
    { key: "email", val: `mailto: ${email}` },
    { key: "tel", val: `tel: ${tel}` }
  ]

  return(
    <div className="ContactImgs flex end">
    {
      contactImgs?.map( (contact, c)=>{
        const src = `https://bzdrive.com/files/ico/contacts/${contact.key}.png`
        let key = `ContactImg${contact.key}${c}`
        return(
          <div className="ContactBtn flex" key={key}>
            <a href={contact.val} target="_blank" rel="noreferrer"><img className="ImgBtn" src={src} alt={contact.key} /></a>
          </div>
        )
      })
    }
    </div>
  )
}