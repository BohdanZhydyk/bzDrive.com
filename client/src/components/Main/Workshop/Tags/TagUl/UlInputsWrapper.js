import React from "react"

import InputText from "../../../../All/InputText"


export function UlInputsWrapper({ props:{el, nr, setWorkshop, setEditingTag} }){
  
  const inputPropsesUl = (lan)=>{
    return {
      legend: `ul_${lan}`,
      type: `text`,
      val: el.body[lan]?.ul,
      cbVal: (val)=>{
        const newEl = {...el, body:{...el?.body, [lan]:{...el?.body[lan], ul:val}} }
        setWorkshop( prev=> prev?.map( (el, e)=> (e !== nr) ? el : newEl ))
        setEditingTag( prev=> newEl )
      },
      cbErr: ()=>{}
    }
  }

  const inputPropsesLi = (lan, li, n)=>{
    return {
      legend: `li_${lan}_${n}`,
      type: `text`,
      val: li,
      cbVal: (val)=>{
        const newEl = {
          ...el,
          body:{
            ...el?.body,
            [lan]:{
              ...el?.body[lan],
              li:el?.body[lan]?.li.map( (txt, t)=> t !== n ? txt : val )
            }
          }
        }
        setWorkshop( prev=> prev?.map( (el, e)=> (e !== nr) ? el : newEl ))
        setEditingTag( prev=> newEl )
      },
      cbErr: ()=>{}
    }
  }

  return(
    <div className="UlInputsWrapper flex wrap">
    {
      ["en","ua","pl"]?.map( (lan, l)=>{
        const keyUl = `EditTagUl${nr}${l}`
        return(
          <div className="UlInputs" key={keyUl}>

            <InputText props={inputPropsesUl(lan)} />

            <div className="LiInputsWrapper flex column">
            {
              el?.body[lan]?.li.map( (li, n)=>{
                const keyLi = `EditTagLi${nr}${l}${n}`
                return <InputText props={inputPropsesLi(lan, li, n)} key={keyLi} />
              })
            }
            </div>

          </div>
        )
      })
    }
    </div>
  )
}