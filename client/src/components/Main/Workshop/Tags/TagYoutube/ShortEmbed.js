import React, { useState } from "react"
import ActionBtn from "../../../../All/ActionBtn"


export function ShortEmbed({ props:{shorts, setShorts, short, i, actPlayer, setActPlayer, isAdmin, newShortPannel, Reducer} }) {

  const [del, setDel] = useState(false)

  const thumbnail = `https://img.youtube.com/vi/${short?.videoId}/hqdefault.jpg`
  const active = actPlayer?.id === short?.id

  function NEW_SHORT(i) {
    if (shorts.find(s => s.id === "NewShort")) return
    setShorts(prev=> [ ...prev.slice(0, i), newShortPannel, ...prev.slice(i) ] )
  }

  return (
    <div className="ShortEmbed" title={short?.name}>

      {
        !active
        ?
        <div className="ShortEmbedThumbnail">
          <img className="ThumbnailImg" src={thumbnail} alt={short.name} onClick={()=> setActPlayer(prev=>short)} />
          {
            isAdmin &&
            <div className="ActionLine flex end">
              { !del && <ActionBtn props={{name:'plus', click:()=>NEW_SHORT(i)}} /> }
              { !del && <ActionBtn props={{name:'delete', click:()=>setDel(prev=> !prev)}} /> }
              { del && <ActionBtn props={{name:'check', click:()=>Reducer({type:"DELETE_SHORT", short})}} /> }
              { del && <ActionBtn props={{name:'cancel', click:()=>setDel(prev=> !prev)}} /> }
            </div>
          }
        </div>
        :
        <iframe
          src={`https://www.youtube.com/embed/${short?.videoId}`}
          allow="autoplay; encrypted-media"
          frameBorder="0"
          allowFullScreen
        />
      }

    </div>
  )
}
