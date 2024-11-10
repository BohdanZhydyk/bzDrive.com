import React, { useState } from "react"

import "./MenuSettings.scss"
import ActionBtn from "../../../All/ActionBtn"
import { Link } from "./Link"


function MenuSettings({ props:{nav, Reducer} }){

  const lvls = ["guest", "user", "admin"]

  const newLink = {
    name: "",
    to: "",
    lvl: 0
  }

  const [edit, setEdit] = useState(false)
  const [navigation, setNavigation] = useState(nav)

  function SAVE_NAVIGATION(){
    Reducer({type:"SAVE_NAVIGATION", nav:navigation})
  }

  function ADD_LINK(){
    setNavigation( prev=>[...prev, newLink] )
    setEdit(prev=>true)
  }
  function ADD_SUBLINK(m){
    setNavigation(prev=>prev.map( (link, l)=>
      (l !== m) ? link : {...link, subnav: link?.subnav?.length ? [...link?.subnav, newLink] : [newLink]}
    ))
    setEdit(prev=>true)
  }
  function DEL_LINK(m){
    setNavigation( prev=>prev.filter( (_, l)=> l !== m ))
    setEdit(prev=>true)
  }
  function DEL_SUBLINK(m,s){
    setNavigation( prev=>prev.map( (link, l)=>
      (l !== m) ? link : { ...link, subnav: link.subnav.filter((_, n) => n !== s) }
    ))
    setEdit(prev=>true)
  }

  function CHG_LINK(field, e, m, s){
    let newVal = e?.target?.value ?? ''
    if(field === "to" && newVal.length > 0 && !newVal.startsWith("/")){ newVal = "/" + newVal }
    setNavigation(prev=>
      prev.map( (link, l)=>
        l !== m
        ? link
        : s === false
          ? {...link, [field]:newVal}
          : {...link, subnav: link?.subnav.map( (sub, n)=> n !== s ? sub : {...sub, [field]:newVal}) }
      )
    )
    setEdit(prev=>true)
  }

  return (
    <div className="MenuSettings flex column">

      {
        (navigation?.length > 0) && navigation.map( (mainLink, m)=>{
          const props = {style:"Link", link:mainLink, lvls, m, s:false, CHG_LINK, DEL_LINK, ADD_SUBLINK, DEL_SUBLINK}
          return(
            <div className="MainLink flex column" key={`MainLink-${m}`}>

              <Link props={props} />

              {
                (mainLink?.subnav?.length > 0) && mainLink.subnav.map( (subLink, s)=>{
                  const props = {style:"SubLink", link:subLink, lvls, m, s, CHG_LINK, DEL_LINK, ADD_SUBLINK, DEL_SUBLINK}
                  return <Link props={props} key={`SubLink-${m}${s}`} />
                })
              }

            </div>
          )
        })
      }

      <div className="BtnsPannel flex end">
        { edit && <ActionBtn props={{name:"save", click:SAVE_NAVIGATION} } /> }
        <ActionBtn props={{name:"plus", click:ADD_LINK} } />
      </div>

    </div>
  )
}

export default MenuSettings
