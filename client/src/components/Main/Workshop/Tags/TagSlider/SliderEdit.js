import React, { useState } from "react"

import Input from "../../../../All/Input"
import ActionBtn from "../../../../All/ActionBtn"
import { bzDeleteFile } from "../../../../../AppFunctions"


export function SliderEdit({ props:{el, i, setWorkshop, setEditingText} }){

  const link = `https://bzdrive.com/`
  const fileAddr = "files/slider/"

  const imgLink = `https://bzdrive.com/files/ico/`
  const btnL = `${imgLink}sliderBtnL.png`
  const btnR = `${imgLink}sliderBtnR.png`

  const [actImg, setActImg] = useState({T:false, K:false})

  const inputPropses = (t, l)=>{
    return {
      legend: `${el.body[t]?.txt[l]?.name} - ${t}`,
      type: `text`,
      val: el.body[t]?.txt[l]?.val,
      cbVal: (val)=>{
        setWorkshop( (prev)=> prev?.map( (el, e)=> e !== i
          ? el
          :
          {
            ...el,
            body:el?.body.map( (theme, T)=>
              T !== t
              ? theme
              :
              {...theme, txt:theme?.txt.map( (line, L)=>
                L !== l
                ? line
                : {...line, val}
              )}
            )
          }
        ))
        setEditingText(prev=>true)
      },
      cbErr: ()=>{}
    }
  }

  function MOVE_IMG(dir, image, t, k){

    function ImgTo(imgs, nr) {
      if(dir === "L"){
        const imgToMove = imgs.splice(nr, 1)[0]
        imgs.splice(nr - 1, 0, imgToMove)
        setActImg({T:t, K:nr - 1})
      }
      if(dir === "R"){
        const imgToMove = imgs.splice(nr, 1)[0]
        imgs.splice(nr + 1, 0, imgToMove)
        setActImg({ T: t, K: nr + 1 })
      }
      if(dir === "DEL") {
        const fileName = image
        bzDeleteFile(fileAddr, fileName, (data)=>{
          if(data?.status === 200){ imgs.splice(nr, 1) }
        })
      }
      return imgs
    }

    setWorkshop( (prev)=> prev?.map( (el, e)=> e !== i
      ? el
      :
      {
        ...el,
        body:el?.body.map( (theme, T)=>
          T !== t
          ? theme
          :
          {...theme, imgs:ImgTo(theme?.imgs, k)}
        )
      }
    ))

    setEditingText(prev=>true)

  }

  return(
    <div className="SliderEdit flex column">
    {
      el?.body.map( (theme, t)=>{
        const key_t = `ThemeInputsWrapper${i}${t}`
        return(
          <div className="ThemeInputsWrapper flex wrap" key={key_t}>
          {
            theme?.txt.map( (lan, l)=>{
              const key_l = `ThemeInput${i}${t}${l}`
              return <Input props={inputPropses(t, l)} key={key_l} />
            })
          }
          {
            theme?.imgs.map( (image, k)=>{
              const isFirstEl = k !== 0
              const isLastEl = k !== theme?.imgs.length - 1
              const isActImg = actImg?.T === t && actImg?.K === k
              const classes = `SliderImage ${isActImg ? `ActImg` : ``} flex`
              const ACT_IMG = ()=>setActImg({T:t, K:k})
              const key_k = `SliderImage${i}${t}${k}`
              const file = `${link}${fileAddr}${image}`
              return(
                <div className={classes} key={key_k}>
                  {
                    (isActImg && isFirstEl) &&
                    <div className="ActImgBtnL flex" onClick={()=>MOVE_IMG("L", image, t, k)}>
                      <img className="ImgBtn" src={btnL} alt="Lbtn" />
                    </div>
                  }
                  <img src={file} onClick={ACT_IMG} alt="SlImg" />
                  {
                    (isActImg && isLastEl) &&
                    <div className="ActImgBtnR flex" onClick={()=>MOVE_IMG("R", image, t, k)}>
                      <img className="ImgBtn" src={btnR} alt="Rbtn" />
                    </div>
                  }
                  {
                    isActImg &&
                    <div className="ActImgBtnDel flex">
                      <ActionBtn props={{name:'delete', click:()=>MOVE_IMG("DEL", image, t, k)}} />
                    </div>
                  }
                </div>
              )
            })
          }
          </div>
        )
      })
    }
    </div>
  )
}