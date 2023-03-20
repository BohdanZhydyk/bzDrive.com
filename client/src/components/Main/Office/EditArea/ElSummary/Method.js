import React from "react"


export function Method({ props:{method, AreaFn} }){

  let CHANGE_INPUT = (method)=> AreaFn({type:"CHG_METHOD", value:method})

  let MethodZero = 'gotówka'
  let MethodOne = 'przelew'

  return(
    <form className="flex">

      <div className="radio">

        <input type="radio" id="MethodZero"
          value={MethodZero} checked={method === 0} onChange={ ()=> CHANGE_INPUT(0) }
        />

        <label htmlFor="MethodZero">{MethodZero}</label>

      </div>

      <div className="radio">

        <input type="radio" id="MethodOne"
          value={MethodOne} checked={method !== 0} onChange={ ()=> CHANGE_INPUT(1) }
        />

        <label htmlFor="MethodOne">{MethodOne}</label>

      </div>
      
    </form>
  )
}