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

  const user = GetUser()

  const [workshop, setWorkshop] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingText, setEditingText] = useState(false)

  function SAVE_WORKSHOP(){
    setEditMode(prev=>false)
    setEditingText(prev=>false)
    WorkshopReducer({ type:"SAVE_WORKSHOP" }, workshop, setWorkshop)
  }

  function GET_WORKSHOP(){
    setEditMode(prev=>false)
    setEditingText(prev=>false)
    WorkshopReducer({ type:"GET_WORKSHOP" }, workshop, setWorkshop)
  }

  useEffect( ()=>{ !workshop && GET_WORKSHOP() },[])

  // console.log(workshop)

  return(
    <div className="Workshop flex column">

      {
        user?.role === "admin" &&
        <div className="AdminBtn flex end stretch">

          <span className="AdminInfo txtOrg bold flex">Jesteś administratorem - masz pełną kontrolę nad treścią strony!</span>
          
          { !editMode && <ActionBtn props={{name:'edit', click:()=>setEditMode(prev=> !prev)}} /> }
          { editingText && <ActionBtn props={{name:'save', click:SAVE_WORKSHOP}} /> }
          { editMode && <ActionBtn props={{name:'cancel', click:GET_WORKSHOP}} /> }

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

            const key = `TagKey${el?.id}${i}`
            const props = {el, i, user, setWorkshop, editMode, setEditingText}

            switch (el?.tag) {
              case "h":         return <TagH          props={props} key={key} />
              case "p":         return <TagP          props={props} key={key} />
              case "ul":        return <TagUl         props={props} key={key} />
              case "contacts":  return <TagContacts   props={props} key={key} />
              case "slider":    return <TagSlider     props={props} key={key} />
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