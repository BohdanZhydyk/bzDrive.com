import React, { useState, useEffect, useRef } from "react"

import "./Connect.scss"
import { Scrollbars } from 'react-custom-scrollbars-2'
import { GetUser } from "../../../AppFunctions"
import { MessageArea } from "./MessageArea"
import { ChatInputLine } from "./ChatInputLine"


function Connect({ props:{} }){

  const user = GetUser()

  const [msgs, setMsgs] = useState([
    {
      id: 12345678901,
      author: "bz83",
      txt: "first msg"
    },
    {
      id: 12345678902,
      txt: "second msg"
    },
    {
      id: 12345678903,
      author: "bz83",
      txt: "third msg"
    },
    {
      id: 12345678904,
      author: "test",
      txt: "fourth msg"
    }
  ])

  const isMsgs = msgs?.length > 0

  const emptyMsg = "emptyMsg"

  const scrollbarsRef = useRef()

  useEffect(() => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom()
    }
  }, [msgs])

  return(
    <div className="Connect flex column">
    {
      !user?.role
      ?
      <React.Fragment></React.Fragment>
      :
      <React.Fragment>

        <Scrollbars className="ChatArea flex" ref={scrollbarsRef}>
        {
          !isMsgs
          ? <span className="EmptyMsg flex">{emptyMsg}</span>
          : <MessageArea props={{user, msgs}} />
        }
        </Scrollbars>

        <ChatInputLine props={{user, setMsgs}} />

      </React.Fragment>
    }

    </div>
  )
}

export default Connect