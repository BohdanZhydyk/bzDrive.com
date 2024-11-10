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
import MenuSettings from "./MenuSettings"


function Workshop({props:{ nav, AppReload }}) {

  const user = GetUser()
  const isAdmin = user?.role === "admin"

  const adminTxt = `Jesteś administratorem - masz pełną kontrolę nad treścią strony!`

  const [workshop, setWorkshop] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingTag, setEditingTag] = useState(false)

  const Reducer = (action)=> WorkshopReducer({action, editingTag, setWorkshop, setEditMode, setEditingTag, AppReload})

  function SAVE_WORKSHOP(){ Reducer({ type:"SAVE_WORKSHOP" }) }
  function GET_WORKSHOP(){ Reducer({ type:"GET_WORKSHOP" }) }

  useEffect( ()=>{ !workshop && GET_WORKSHOP() },[])

  // console.log(workshop)

  return(
    <div className="Workshop flex column">

      {
        isAdmin && workshop &&
        <div className="AdminBtn flex end stretch">

          <span className="AdminInfo txtOrg bold flex">{adminTxt}</span>
          
          { !editMode && <ActionBtn props={{name:'edit', click:()=>setEditMode(prev=> !prev)}} /> }
          { editingTag && <ActionBtn props={{name:'save', click:SAVE_WORKSHOP}} /> }
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
          workshop.map( (el, nr)=>{

            const key = `TagKey${el?.id}${nr}`
            const props = {el, nr, user, setWorkshop, editMode, editingTag, setEditingTag}

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

      { isAdmin && workshop && editMode && <MenuSettings props={{nav, Reducer}} /> }

    </div>
  )
}

export default Workshop