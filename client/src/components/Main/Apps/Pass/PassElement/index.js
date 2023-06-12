import React, { useEffect, useState } from "react"

import { ElementName } from "./ElementName"
import { PassData } from "./PassData"


function PassElement({ props:{user, el, i, newLine, groupsForInput, SAVE_PASS, SHOW_PASS}}){

  const [edit, setEdit] = useState(false)

  const [save, setSave] = useState(false)

  const [element, setElement] = useState(false)

  const OPEN_CLOSE = ()=>{
    const hiddenPass = (line)=> ({userName:line?.userName, login:line?.login})
    setElement( (i === 0) ? el : {...el, siteData:el?.siteData.map( (line)=> hiddenPass(line) )} )
    setEdit(prev=> !prev)
    setSave(false)
  }

  const SAVE_ELEMENT = ()=>{
    OPEN_CLOSE()
    SAVE_PASS(element)
  }

  const ADD_LINE = ()=>{
    setElement( {...element, siteData: [...element?.siteData, newLine]} )
    setSave(true)
  }

  const DELETE_LINE = (l)=>{
    setElement({ ...element, siteData: element?.siteData.filter( (el, n)=> n !== l ) })
    setSave(true)
  }

  const passDataProps = {
    el, i, groupsForInput, element, setElement, save, setSave, SAVE_ELEMENT,
    OPEN_CLOSE, SHOW_PASS, DELETE_LINE, ADD_LINE
  }

  useEffect( ()=>{ setElement(el) },[el])

  // edit && console.log("element", element)

  return(
    <>

      <ElementName props={{edit, el, i, OPEN_CLOSE}}/>

      { edit && <PassData props={passDataProps}/> }

    </>
  )
}

export default PassElement