import React, { useState, useEffect } from "react"

import './Workshop.scss'
import { GetUser } from "../../../AppFunctions"
import { WorkshopReducer } from "./WorkshopReducer"
import ActionBtn from "./../../All/ActionBtn"
import SiteIcon from "../../All/SiteIcon"
import TagH from "./Tags/TagH"
import TagP from "./Tags/TagP"
import TagUl from "./Tags/TagUl"
import TagContacts from "./Tags/TagContacts"
import TagSlider from "./Tags/TagSlider"


function Workshop() {

  const {lang, role} = GetUser()

  const [workshop, setWorkshop] = useState(false)

  const [editMode, setEditMode] = useState(false)

  useEffect( ()=>{ !workshop && WorkshopReducer({ type:"GET_WORKSHOP" }, workshop, setWorkshop) },[])

  // console.log(workshop)

  return(
    <div className="Workshop flex column">

      {
        role === "admin" &&
        <div className="AdminBtn flex end stretch">
          <span className="AdminInfo txtOrg bold flex">Jesteś administratorem - masz pełną kontrolę nad treścią strony!</span>
          <ActionBtn props={{
            name:editMode ? 'save' : 'edit',
            click:()=>{
              !editMode
              ? setEditMode(prev=> !prev)
              : setEditMode(prev=> !prev)
            }
          }} />
        </div>
      }

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
              case "h":         return <TagH          props={{editMode, el, i, lang, setWorkshop}} key={key} />
              case "p":         return <TagP          props={{editMode, el, i, lang, setWorkshop}} key={key} />
              case "ul":        return <TagUl         props={{editMode, el, i, lang, setWorkshop}} key={key} />
              case "contacts":  return <TagContacts   props={{editMode, el, i, lang, setWorkshop}} key={key} />
              case "slider":    return <TagSlider     props={{editMode, el, i, lang, setWorkshop}} key={key} />
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