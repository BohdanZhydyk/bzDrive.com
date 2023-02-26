import React, { useState, useEffect } from "react"

import './Workshop.scss'
import { GetUser } from "../../../AppFunctions"
import { WorkshopReducer } from "./WorkshopReducer"
import SiteIcon from "../../All/SiteIcon"
import TagH from "./Tags/TagH"
import TagP from "./Tags/TagP"
import TagUl from "./Tags/TagUl"
import TagContacts from "./Tags/TagContacts"
import TagSlider from "./Tags/TagSlider"


function Workshop() {

  const lang = GetUser().lang

  const [workshop, setWorkshop] = useState(false)

  useEffect( ()=>{ !workshop && WorkshopReducer({ type:"GET_WORKSHOP" }, workshop, setWorkshop) },[])

  // console.log(workshop)

  return(
    <div className="Workshop flex column">
    {
      !workshop
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <>
      {
        workshop.map( (el, i)=>{

          const key = `TagKey${el?.tag}${i}`

          switch (el?.tag) {
            case "h":         return <TagH          props={{el, lang}} key={key} />
            case "p":         return <TagP          props={{el, lang}} key={key} />
            case "ul":        return <TagUl         props={{el, lang}} key={key} />
            case "contacts":  return <TagContacts   props={{el, lang}} key={key} />
            case "slider":    return <TagSlider     props={{el, lang}} key={key} />
            default:          return <div key={key}></div>
          }
        })
      }
      </>
    }
    </div>
  )
}

export default Workshop