import React from "react"

import Input from "../../../../All/Input"
import ActionBtn from "../../../../All/ActionBtn"
import { userNameProps, loginProps, encryptedPassProps, cryptedPassProps } from "./passProps"


export function PassLines({ props:{el, i, element, setElement, setSave, SHOW_PASS, DELETE_LINE}}){
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
                <Input props={ userNameProps(line, l, setElement, setSave) } />
              </div>

              <div className="Login flex">
                <Input props={ loginProps(line, l, setElement, setSave) } />
              </div>

              <div className="Password flex">
                <Input props={passProps} />
              </div>

            </div>

            <div className="LineBtns flex end">
              {
                !line?.encrypted
                ? <ActionBtn props={{name:"show", click:()=>SHOW_PASS(el?._id, l, true)}} />
                : <ActionBtn props={{name:"hide", click:()=>SHOW_PASS(el?._id, l, false)}} />
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