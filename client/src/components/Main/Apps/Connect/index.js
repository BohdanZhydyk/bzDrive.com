import React, { useState, useEffect, useRef } from "react"

import "./Connect.scss"
import { Scrollbars } from 'react-custom-scrollbars-2'
import { GetUser, PostToApi } from "../../../../AppFunctions"
import { MessageArea } from "./MessageArea"
import { ChatInputLine } from "./ChatInputLine"


function Connect(){

  const user = GetUser()

  const [msgs, setMsgs] = useState([])

  const isMsgs = msgs?.length > 0

  const emptyMsg = "emptyMsg"

  const scrollbarsRef = useRef()
  
  const ConnectReducer = (action, callback)=>{

    // switch (action.type) {
    //   case "GET_MESSAGES":    GET_MESSAGES();   break;
    //   case "ADD_MESSAGE":     ADD_MESSAGE();    break;
    //   default: break;
    // }
  
    // function SUBSCRIBE(){
    //   PostToApi( '/getConnect', {Subscribe:true}, (data)=>{
    //     setMsgs(prev=> data)
    //     SUBSCRIBE()
    //     if(scrollbarsRef.current){ scrollbarsRef.current.scrollToBottom() }
    //   })
    // }
  
    // function GET_MESSAGES(){
    //   PostToApi( '/getConnect', {GetMessages:true}, (data)=>{
    //     setMsgs(prev=> data)
    //     SUBSCRIBE()
    //     if(scrollbarsRef.current){ scrollbarsRef.current.scrollToBottom() }
    //   })
    // }
  
    // function ADD_MESSAGE(){
    //   PostToApi( '/getConnect', {AddMessage:action?.val}, (data)=>{
    //     setMsgs(prev=> data)
    //     SUBSCRIBE()
    //     if(scrollbarsRef.current){ scrollbarsRef.current.scrollToBottom() }
    //   })
    // }
  
  }

  useEffect(() => {
    ConnectReducer({type:"GET_MESSAGES"})
  }, [])

  console.log(msgs)

  return(
    <div className="Connect flex column">
    {
      !user?.role
      ?
      <React.Fragment></React.Fragment>
      :
      <React.Fragment>

        <Scrollbars className="ChatArea flex" ref={scrollbarsRef}>

          <div className="ChatWrapper flex column end">
          {
            !isMsgs
            ? <span className="EmptyMsg flex">{emptyMsg}</span>
            : <MessageArea props={{user, msgs}} />
          }
          </div>

        </Scrollbars>

        <ChatInputLine props={{user, ConnectReducer}} />

      </React.Fragment>
    }

    </div>
  )
}

export default Connect