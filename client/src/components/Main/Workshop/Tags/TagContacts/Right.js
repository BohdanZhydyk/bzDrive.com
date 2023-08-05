import React from "react"

import Input from "../../../../All/Input"
import { tr } from "../../../../../AppTranslate"


export function Right({ props:{edit, contacts, i, user, setWorkshop, setEditingText} }){

  const inputPropses = (contact)=>{
    return {
      legend: contact?.txt[user?.lang],
      type: `text`,
      val: contact?.content?.link[1],
      cbVal: (val)=>{
        setWorkshop( (prev)=> prev?.map( (el, e)=> e !== i
          ? el
          : {
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
        ))
        setEditingText(prev=>true)
      },
      cbErr: ()=>{}
    }
  }

  return(
    <div className="el-R flex column start">
    {
      contacts.map( (contact, c)=>{

        const link = `${contact?.content?.link[0]}${contact?.content?.link[1]}`
        const key = `Contact${i}${c}`
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
              <Input props={inputPropses(contact)} key={`EditTagContacts${i}${c}`} />
            </div>
          }
          </div>
        )
      })
    }
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