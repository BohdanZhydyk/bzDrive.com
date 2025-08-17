import React from "react"
import "./TagYoutube.scss"
import InputText from "../../../../All/InputText"
import ActionBtn from "../../../../All/ActionBtn"
import { inputShort } from "./inputShortPropses"


export function NewShort({ props: { i, newShort, setNewShort, setShorts, setActPlayer, Reducer } }) {

  function ADD_NEW_SHORT(i){
    Reducer({type:"ADD_NEW_SHORT", newShort, i})
    setNewShort( prev=>({"name":"", "videoId":""}) )
  }
  function CLOSE_NEW_SHORT(){
    setShorts(prev => prev.filter(s => s.id !== "NewShort"))
    setNewShort( prev=>({"name":"", "videoId":""}) )
  }

  return (
    <div className="ShortEmbed flex column start" key={`AddShort`}  onClick={()=> setActPlayer(prev=>false)} >

      <div className="ShortEmbedThumbnail">

        <div className="NewShortForm flex column end">

          <InputText props={ inputShort({newShort, setNewShort})?.namePropses }/>
          <InputText props={ inputShort({newShort, setNewShort})?.idPropses }/>
        
        </div>

        <div className="ActionLine flex end">
          { newShort?.name && newShort?.videoId && <ActionBtn props={{name:'save', click:()=>ADD_NEW_SHORT(i)}} /> }
          <ActionBtn props={{name:'cancel', click:CLOSE_NEW_SHORT}} />
        </div>

      </div>

    </div>
  )
}
