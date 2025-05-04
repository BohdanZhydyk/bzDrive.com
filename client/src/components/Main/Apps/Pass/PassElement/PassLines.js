import React from "react"

import InputText from "../../../../All/InputText"
import ActionBtn from "../../../../All/ActionBtn"
import { userNameProps, loginProps, encryptedPassProps, cryptedPassProps } from "./passProps"


export function PassLines({ props:{id, i, element, setElement, setSave, DELETE_LINE, Reducer}}){
  return(
    <div className="PassLines flex column">
    {
      element?.siteData && element.siteData.map( (line, l)=>{

        const passProps = line?.encrypted
          ? encryptedPassProps(line, l, setElement, setSave)
          : cryptedPassProps()

        return(
          <div className="PassLine flex" key={`PassLine${i}${l}`} >

            <div className="UserLoginPannel flex wrap">

              <div className="UserName flex">
                <InputText props={ userNameProps(line, l, setElement, setSave) } />
              </div>

              <div className="Login flex">
                <InputText props={ loginProps(line, l, setElement, setSave) } />
              </div>

              <div className="Password flex">
                <InputText props={passProps} />
              </div>

            </div>

            <div className="LineBtns flex end">
              {
                !line?.encrypted
                ? <ActionBtn props={{ name:"show", click:()=>Reducer({type:"SHOW_PASS", id, l, encrypted:true}) }} />
                : <ActionBtn props={{name:"hide", click:()=>Reducer({type:"SHOW_PASS", id, l, encrypted:false}) }} />
              }
              <ActionBtn props={{name:"delete", click:()=>DELETE_LINE(l)}} />
            </div>

          </div>
        )
      })
    }
    </div>
  )
}