import React from "react"

import "./RadioInput.scss"


const RadioInput = ({ props:{radios, act, cb} })=>{

  return(
    <form className="RadioInput flex start between">

    {
      radios && radios.map( (radio, r)=>{
        const key = `RadioBtn${r}`
        return(
          <div className="RadioBtn" key={key}>

            <input type="radio" id={key}
              value={radio} checked={act === r}
              onChange={ ()=> cb(r) }
            />

            <label htmlFor={key}>{radio}</label>

          </div>
        )
      })
    }
      
    </form>
  )
}

export default RadioInput