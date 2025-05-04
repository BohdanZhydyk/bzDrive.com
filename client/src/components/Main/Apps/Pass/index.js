import React, { useState, useEffect } from "react"

import "./Pass.scss"
import { GetUser } from "../../../../AppFunctions"
import { PassReducer, getGroups, newLine } from "./PassReducer"
import PassElement from "./PassElement"
import SiteIcon from "../../../All/SiteIcon"
import { UserArea } from "./UserArea"


function Pass(){

  const [user, setUser] = useState( {...GetUser(), login: GetUser().login ?? `ID_${Date.now()}`} )

  const [pass, setPass] = useState( [] )

  const [sorted, setSorted] = useState(pass)

  // const passArr = [newPass, ...(sorted == null || sorted.length < 1 ? [] : sorted)]

  const [actGroup, setActGroup] = useState("All")

  const groups = getGroups(pass)

  const groupsForInput = groups.filter( gr=> gr !== "All" && gr !== "Unsorted" )

  function Reducer(action){ PassReducer({action, pass, setPass, sorted, setSorted, actGroup, setActGroup}) }

  useEffect( ()=>{ Reducer({type:"GET_PASS"}) },[])

  // console.log("pass", pass)
  // console.log("sorted", sorted)

  return(
    <div className="Pass flex column">

    {
      !pass && user?.role
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <>

        <UserArea props={{user, pass, actGroup, groups, Reducer}}/>

        <div className="PassArea flex start wrap stretch">
        {
          (pass && user?.role) && sorted.map( (el, i)=>{

            const passProps = {user, el, i, newLine, groupsForInput, Reducer}
            const key = `PassElement${actGroup}${i}`

            return( <PassElement props={passProps} key={key} /> )
          })
        }
        </div>

      </>
    }

    </div>
  )
}

export default Pass