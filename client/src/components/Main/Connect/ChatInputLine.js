import React, { useState } from "react"


export function ChatInputLine({ props:{user, setMsgs} }){

  const icoSend = `https://bzdrive.com/files/ico/icoSend.png`

  const [val, setVal] = useState("")

  const onChange = (e)=> setVal(e?.target?.value ?? '')

  function SEND_MSG(val){
    if(val.trim()?.length === 0) return
    setMsgs( prev=> [...prev, { id: Date.now(), author: user?.login, ava: user?.ava, txt: val }] )
    setVal("")
  }

  return(
    <div className="ChatInputLine flex stretch">

      <textarea className="ChatInput" placeholder={"type your message here..."}
        value={val}
        onChange={onChange}
        onKeyUp={ (e)=> e.key === "Enter" && SEND_MSG(val) }
      ></textarea>

      <div className="SendBtn flex column end">
        <img className="ImgBtn" src={icoSend} onClick={ ()=>SEND_MSG(val) } alt="ava" />
      </div>

    </div>
  )
}