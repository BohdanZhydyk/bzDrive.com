import React, { useEffect, useState } from "react"
import "./TagYoutube.scss"
import { ShortEmbed } from "./ShortEmbed"
import { NewShort } from "./NewShort"


function TagYoutube({ props: { el, nr, user, setWorkshop, editMode, editingTag, setEditingTag, Reducer } }) {

  const [shorts, setShorts] = useState( [] )
  const [newShort, setNewShort] = useState( {"name":"", "videoId":""} )
  const [actPlayer, setActPlayer] = useState( false )
  const [startIndex, setStartIndex] = useState( 0 )

  const isAdmin = user?.role === "admin"
  const count = Math.min(shorts.length, 6)
  const newShortPannel = { id:"NewShort", videoId:true }

  function slidePrev(){ setStartIndex(prev => (prev > 0 ? prev - 1 : prev)) }
  function slideNext(){ setStartIndex(prev => (prev + count < shorts.length ? prev + 1 : prev)) }

  // useEffect(()=> { setShorts(el?.body || [newShortPannel]) }, [el?.body])
  useEffect(()=> { setShorts(el?.body?.length === 0 ? [newShortPannel] : el?.body) }, [el?.body])

  // console.log("shorts", shorts)
  // console.log("actPlayer", actPlayer)

  return (
    <div className="TagYoutube flex column">

      <div className="ShortsRow flex wrap">
        
        <div className="ShortsSlideBtnLine flex"  onClick={slidePrev}>
          { (startIndex > 0) && <img src="https://bzdrive.com/files/ico/sliderBtnL.png" alt="sliderBtnL" /> }
        </div>

        <div className="ShortsSlideBtnColumn flex"  onClick={slidePrev}>
          { (startIndex > 0) && <img src="https://bzdrive.com/files/ico/sliderBtnU.png" alt="sliderBtnU" /> }
        </div>
        
        {
          shorts && shorts.slice(startIndex, startIndex + count).map( (short, i)=>{

            const videoId = short?.videoId
            const key = `${short?.id}${i}`

            if (!videoId) return null

            return(
              short?.id === "NewShort"
              ? <NewShort props={{i, newShort, setNewShort, setShorts, setActPlayer, Reducer}} />
              : <ShortEmbed props={{shorts, setShorts, short, i, actPlayer, setActPlayer, isAdmin, newShortPannel, Reducer}} key={key} />
            )

          })
        }

        <div className="ShortsSlideBtnLine flex" onClick={slideNext}>
          { (startIndex + count < shorts.length) && <img src="https://bzdrive.com/files/ico/sliderBtnR.png" alt="sliderBtnR" /> }
        </div>

        <div className="ShortsSlideBtnColumn flex" onClick={slideNext}>
          { (startIndex + count < shorts.length) && <img src="https://bzdrive.com/files/ico/sliderBtnD.png" alt="sliderBtnD" /> }
        </div>

      </div>

    </div>
  )
}

export default TagYoutube
