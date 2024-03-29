import React from "react"


export function MessageArea({ props:{user, msgs} }){
  return(
    <React.Fragment>
    {
      msgs.map( (message, m)=>{

        const key = `MessageArea_${message?.id}${m}`

        const isMyMsg = message?.author?.login === user?.login

        const myAva = `https://bzdrive.com/files/users/${message?.author?.ava ?? user?.ava}`
        const notMyAva = `https://bzdrive.com/files/users/${message?.author?.ava ?? `male.png`}`

        return(
          <div className={`MessageArea flex stretch ${!isMyMsg ? `start` : `end`}`} key={key}>

            { !isMyMsg && <img className="ImgBtn Ava" src={notMyAva} alt="ava" /> }

            <div className={`Message flex start ${isMyMsg ? `is` : `not`}MyMsg`}>
              {message?.txt}
            </div>

            { isMyMsg && <img className="ImgBtn Ava" src={myAva} alt="ava" /> }

          </div>
        )
      })
    }
    </React.Fragment>
  )
}