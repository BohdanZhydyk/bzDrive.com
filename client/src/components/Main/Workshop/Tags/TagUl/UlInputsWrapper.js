import React from "react"

import Input from "../../../../All/Input"


export function UlInputsWrapper({ props:{el, i, setWorkshop, setEditingText} }){
  
  const inputPropsesUl = (lan)=>{
    return {
      legend: `ul_${lan}`,
      type: `text`,
      val: el.body[lan]?.ul,
      cbVal: (val)=>{
        setWorkshop( (prev)=> prev?.map( (el, e)=> e !== i
          ? el
          : {...el, body:{...el?.body, [lan]:{...el?.body[lan], ul:val}} }
        ))
        setEditingText(prev=>true)
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
        setWorkshop( (prev)=> prev?.map( (el, e)=> e !== i
          ? el
          :
          {
            ...el,
            body:{
              ...el?.body,
              [lan]:{
                ...el?.body[lan],
                li:el?.body[lan]?.li.map( (txt, t)=> t !== n ? txt : val )
              }
            }
          }
        ))
        setEditingText(prev=>true)
      },
      cbErr: ()=>{}
    }
  }

  return(
    <div className="UlInputsWrapper flex wrap">
    {
      ["en","ua","pl"]?.map( (lan, l)=>{
        const keyUl = `EditTagUl${i}${l}`
        return(
          <div className="UlInputs" key={keyUl}>

            <Input props={inputPropsesUl(lan)} />

            <div className="LiInputsWrapper flex column">
            {
              el?.body[lan]?.li.map( (li, n)=>{
                const keyLi = `EditTagLi${i}${l}${n}`
                return <Input props={inputPropsesLi(lan, li, n)} key={keyLi} />
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