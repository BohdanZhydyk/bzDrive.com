import React from "react"

import Input from "../../../../All/Input"
import InputSelect from "../../../../All/InputSelect"
import TextArea from "../../../../All/TextArea"
import ActionBtn from "../../../../All/ActionBtn"
import { PassLines } from "./PassLines"
import { PassDataBtns } from "./PassDataBtns"
import { siteNameProps, linkProps, infoProps, groupsProps } from "./passProps"


export function PassData({
  props:{
    el, i, groupsForInput, element, setElement, save, setSave, SAVE_ELEMENT,
    OPEN_CLOSE, SHOW_PASS, DELETE_LINE, ADD_LINE
  }
}){
  
  return(
    <div className="PassData flex start wrap">

      <div className="SiteName flex">
        <Input props={ siteNameProps(element, setElement, setSave) } />
      </div>

      <div className="LinkBefore flex">
        <Input props={ linkProps(element, setElement, setSave) } />
      </div>

      <div className="Group flex">
        <InputSelect props={ groupsProps(element, setElement, groupsForInput, setSave) } />
      </div>

      <PassDataBtns props={{element, save, SAVE_ELEMENT, OPEN_CLOSE}}/>

      <div className="LinkAfter flex">
        <Input props={ linkProps(element, setElement, setSave) } />
      </div>

      <div className="Information flex">
        <TextArea props={ infoProps(element, setElement, setSave) } />
      </div>

      <PassLines props={{el, i, element, setElement, setSave, SHOW_PASS, DELETE_LINE}}/>

      <div className="AddNewPass flex end">
        <ActionBtn props={{name:"plus", click:ADD_LINE}} />
      </div>

    </div>
  )
}