import React from "react"

import InputText from "../../../../All/InputText"
import InputSelect from "../../../../All/InputSelect"
import TextArea from "../../../../All/TextArea"
import ActionBtn from "../../../../All/ActionBtn"
import { PassLines } from "./PassLines"
import { PassDataBtns } from "./PassDataBtns"
import { siteNameProps, linkProps, infoProps, groupsProps } from "./passProps"


export function PassData({
  props:{
    id, i, groupsForInput, element, setElement, save, setSave, SAVE_ELEMENT,
    OPEN_CLOSE, DELETE_LINE, ADD_LINE, Reducer
  }
}){
  
  return(
    <div className="PassData flex start wrap">

      <div className="SiteName flex">
        <InputText props={ siteNameProps(element, setElement, setSave) } />
      </div>

      <div className="LinkBefore flex">
        <InputText props={ linkProps(element, setElement, setSave) } />
      </div>

      <div className="Group flex">
        <InputSelect props={ groupsProps(element, setElement, groupsForInput, setSave) } />
      </div>

      <PassDataBtns props={{element, save, SAVE_ELEMENT, OPEN_CLOSE}}/>

      <div className="LinkAfter flex">
        <InputText props={ linkProps(element, setElement, setSave) } />
      </div>

      <div className="Information flex">
        <TextArea props={ infoProps(element, setElement, setSave) } />
      </div>

      <PassLines props={{id, i, element, setElement, setSave, DELETE_LINE, Reducer}}/>

      <div className="AddNewPass flex end">
        <ActionBtn props={{name:"plus", click:ADD_LINE}} />
      </div>

    </div>
  )
}