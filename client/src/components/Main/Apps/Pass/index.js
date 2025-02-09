import React, { useState, useEffect } from "react"

import "./Pass.scss"
import { GetUser } from "../../../../AppFunctions"
import { PassReducer } from "./PassReducer"
import PassElement from "./PassElement"
import SiteIcon from "../../../All/SiteIcon"
import { UserArea } from "./UserArea"


function Pass(){

  const [user, setUser] = useState( {...GetUser(), login: GetUser().login ?? `ID_${Date.now()}`} )

  const newLine = {userName:"", login:"", pass:"", encrypted:true}
  const newPass = {siteName:"", link:"", info:"", siteData:[newLine]}

  const [pass, setPass] = useState( [] )

  const [sorted, setSorted] = useState(pass)

  const passArr = [newPass, ...(sorted == null || sorted.length < 1 ? [] : sorted)]

  const [actGroup, setActGroup] = useState("All")
  
  const groups = [
    "All",
    "Unsorted",
    ...pass.reduce((acc, line) => {
      if (!acc.includes(line?.group)){ acc.push(line?.group) }
      return acc.filter( group => group !== undefined ).sort((a, b) => a.localeCompare(b))
    }, [])
  ]

  const groupsForInput = groups.filter( gr=> gr !== "All" && gr !== "Unsorted" )

  function GET_PASS(element){
    PassReducer( {type:"GET_PASS"}, (data)=>{setPass(data); setSorted(data)} )
  }

  function SAVE_PASS(element){
    setPass([])
    setSorted([])
    PassReducer({type:"SAVE_PASS", query:element}, (data)=>{
      setPass(data)
      setSorted(data)
      ACT_GROUP_CHG(actGroup)
    })
  }

  function SHOW_PASS(id, l, encrypted){

    function SET(data, encrypted){
      setSorted(
        prev=> prev.map(
          el=> el?._id !== id
          ? el
          : {...el, siteData:el?.siteData.map( (line, n)=>
              (n !== l)
              ? line
              : (
                  encrypted
                  ? {...line, pass:data, encrypted}
                  : {userName:line?.userName, login:line?.login}
                )
            )}
        )
      )
    }

    encrypted
    ? PassReducer({type:"SHOW_PASS", query:{id, l}}, (data)=> SET(data, encrypted) )
    : SET(false, encrypted)
  }

  function ACT_GROUP_CHG(group){
    setActGroup( prev=> group )
    if(group === "Unsorted"){
      setSorted( prev=> pass.filter( el=> !el?.group ) )
      return
    }
    setSorted( prev=> group === "All" ? pass : pass.filter( el=> el?.group === group ) )
  }

  function SORT_PASS(txt){
    ACT_GROUP_CHG("All")
    setSorted( prev=> pass.filter( el=> el?.siteName.toLowerCase().includes(txt.toLowerCase()) ) )
  }

  useEffect( ()=>{ GET_PASS() },[])

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

        <UserArea props={{user, pass, actGroup, groups, SORT_PASS, ACT_GROUP_CHG}}/>

        <div className="PassArea flex start wrap stretch">
        {
          (pass && user?.role) && passArr.map( (el, i)=>{
            const passProps = {user, el, i, newLine, groupsForInput, SAVE_PASS, SHOW_PASS}
            const key = `PassElement${actGroup}${i}`
            return(
              <PassElement props={passProps} key={key} />
            )
          })
        }
        </div>

      </>
    }

    </div>
  )
}

export default Pass