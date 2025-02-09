import React from "react"

import InputText from "../../../../All/InputText"
import { tr } from "../../../../../AppTranslate"


export function Right({ props:{edit, contacts, el, nr, user, setWorkshop, setEditingTag} }){

  const inputPropses = (contact)=>{
    return {
      legend: contact?.txt[user?.lang],
      type: `text`,
      val: contact?.content?.link[1],
      cbVal: (val)=>{
        const newEl = {
          ...el,
          body:el?.body.map( cont=> cont?.element !== contact?.element
            ? cont
            : {
                ...cont,
                content:{
                  ...cont?.content,
                  link:[cont?.content?.link[0], val]
                }
              }
          )
        }
        setWorkshop( (prev)=> prev?.map( (el, e)=> (e !== nr) ? el : newEl ))
        setEditingTag( prev=> newEl )
      },
      cbErr: ()=>{}
    }
  }

  const icons = [
    {
      "key": "youtube",
      "val": "https://www.youtube.com/@bzDrive_TV"
    },
    {
      "key": "tiktok",
      "val": "https://www.tiktok.com/@bzdrivetv"
    },
    {
      "key": "fb",
      "val": "https://www.facebook.com/groups/2981929642022162"
    },
    {
      "key": "in",
      "val": "https://www.linkedin.com/in/bohdan-zhydyk/"
    },
    {
      "key": "fixly",
      "val": "https://fixly.pl/profil/remfhnil"
    },
    {
      "key": "git",
      "val": "https://github.com/BohdanZhydyk"
    }
  ]

  return(
    <div className="el-R flex column start">

      {
        contacts.map( (contact, c)=>{

          const link = `${contact?.content?.link[0]}${contact?.content?.link[1]}`
          const key = `Contact${nr}${c}`
          const txt = `${tr(`Link_${contact?.element}`, user?.lang)}:`

          return(
            <div className="Contact" key={key}>
            {
              !edit
              ?
              <div className="ContactLine">
                <div className="ContactName">{txt}</div>
                <a className="Content flex between stretch" href={link} target="_blank" rel="noreferrer">

                  <img className="ImgBtn" src={contact?.img} alt={contact?.element} />

                  <div className="InfoTxt flex end">
                    {contact?.content?.link[contact?.content?.show]}
                  </div>

                </a>
              </div>
              :
              <div className="ContactLine">
                <InputText props={inputPropses(contact)} key={`EditTagContacts${nr}${c}`} />
              </div>
            }
            </div>
          )
        })
      }

      <div className="ContactImages flex wrap">
        {
          icons?.map( (icon, i)=>{
            const imgLink = `https://bzdrive.com/files/ico/contacts/${icon?.key}.png`
            const key = `ContactImg${icon?.key}${i}`
            return(
              <a className="ContactImg flex" href={icon?.val} target="_blank" rel="noreferrer" key={key}>
                <img className="flex" src={imgLink} alt={icon?.key} />
              </a>
            )
          })
        }
      </div>

    </div>
  )
}

/*
{
  "element": "open",
  "txt": {
    "en": "Open",
    "ua": "Відчинено",
    "pl": "Czynne"
  },
  "content": [
    "Pon : 09:00 - 17:00",
    "Wt  : 09:00 - 17:00",
    "Śr  : 09:00 - 17:00",
    "Czw : 09:00 - 17:00",
    "Pt  : 09:00 - 17:00"
  ],
  "img": "https://bzdrive.com/files/ico/contacts/open.png"
}
*/