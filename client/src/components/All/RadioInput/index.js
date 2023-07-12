import React from "react"

import "./RadioInput.scss"


const RadioInput = ({ props:{radios, act, images, cb} })=>{

  return(
    <form className="RadioInput flex start">

    {
      radios && radios.map( (radio, r)=>{
        const key = `RadioBtn_${radio}_${r}`
        return(
          <div className="RadioBtn flex start stretch" key={key}>

            <input type="radio" id={key}
              value={radio} checked={act === r}
              onChange={ ()=> cb(r) }
            />

            {
              images
              ? <label htmlFor={key}><img className="ImgBtn" src={images[r]} alt="imgRadio" /></label>
              : <label htmlFor={key}>{radio}</label>
            }

          </div>
        )
      })
    }
      
    </form>
  )
}

export default RadioInput