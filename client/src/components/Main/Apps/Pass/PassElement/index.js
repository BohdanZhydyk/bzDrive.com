import React, { useEffect, useState } from "react"

import { ElementName } from "./ElementName"
import { PassData } from "./PassData"


function PassElement({ props:{user, el, i, newLine, groupsForInput, Reducer}}){

  const [save, setSave] = useState(false)

  const [element, setElement] = useState(false)

  const id = el?._id
  const edit = element?.edit

  const OPEN_CLOSE = ()=>{
    Reducer({type:"OPEN_CLOSE", id})
    setSave(false)
  }

  const SAVE_ELEMENT = ()=>{
    OPEN_CLOSE()
    Reducer({type:"SAVE_PASS", element})
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
    id, i, groupsForInput, element, setElement, save, setSave, SAVE_ELEMENT,
    OPEN_CLOSE, DELETE_LINE, ADD_LINE, Reducer
  }

  useEffect( ()=>{ setElement( prev=> el ) },[el])

  // element?.edit && console.log("element", element)

  return(
    <>

      <ElementName props={{edit, element, i, OPEN_CLOSE}}/>

      { element?.edit && <PassData props={passDataProps}/> }

    </>
  )
}

export default PassElement