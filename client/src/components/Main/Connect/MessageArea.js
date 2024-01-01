import React from "react"


export function MessageArea({ props:{user, msgs} }){
  return(
    <React.Fragment>
    {
      msgs.map( (msg, m)=>{

        const key = `MessageArea_${msg?.id}${m}`

        const isMyMsg = msg?.author === user?.login

        const myAva = `https://bzdrive.com/files/users/${msg?.ava ?? user?.ava}`
        const notMyAva = `https://bzdrive.com/files/users/${msg?.ava ?? `male.png`}`

        return(
          <div className={`MessageArea flex ${!isMyMsg ? `start` : `end`}`} key={key}>

            { !isMyMsg && <img className="ImgBtn Ava" src={notMyAva} alt="ava" /> }

            <div className={`Message flex start ${isMyMsg ? `is` : `not`}MyMsg`}>
              {msg?.txt}
            </div>

            { isMyMsg && <img className="ImgBtn Ava" src={myAva} alt="ava" /> }

          </div>
        )
      })
    }
    </React.Fragment>
  )
}