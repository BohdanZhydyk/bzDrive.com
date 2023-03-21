import React, { useEffect, useState } from "react"
import QRCode from 'react-qr-code'

import { tr } from "../../../../../AppTranslate"
import { sanitizeTxt } from "../../../../../AppFunctions"
import { placeProps, fromProps, toProps } from "./propses"
import Input from "../../../../All/Input"


export function DocSign({ props:{lang, mode, nr, setNr, setSave, editErr, setEditErr, printMode} }) {

  const timeToDate = (time)=>{
    const str = time.toString()
    const year = str.slice(0,4)
    const month = str.slice(4,6)
    const day = str.slice(6,8)
    return `${day}.${month}.${year}`
  }

  const url = `https://bzdrive.com${window.location.pathname}`
  const [QRsize, setQRsize] = useState(parseInt(window.innerWidth / 30))
  useEffect(() => {
    const handleResize = () => setQRsize(parseInt(window.innerWidth / 30))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return(
    <div className="DocSign flex end">

    {
      !printMode
      ?
      <>
  
        <Input props={ placeProps(tr, lang, nr, setNr, editErr, setEditErr, setSave, sanitizeTxt) } />
  
        <Input props={ fromProps(tr, lang, nr, setNr, setSave) } />
        
        { ["ZL"].includes(mode) && <Input props={ toProps(tr, lang, nr, setNr, setSave) } /> }

      </>
      :
      <div className="SignArea flex column">

        <div className="SignLine flex">
          <span className="SignName flex end">{`${tr(`PlaceLegendTop`,lang)} :`}</span>
          <span className="SignData bold flex end">{nr?.place ?? ''}</span>
        </div>

        <div className="SignLine flex">
          <span className="SignName flex end">{`${tr(`FromLegend`,lang)} :`}</span>
          <span className="SignData bold flex end">{nr?.from ? timeToDate(nr.from) : ''}</span>
        </div>

        {
          ["ZL"].includes(mode) &&
          <div className="SignLine flex">
            <span className="SignName flex end">{`${tr(`ToLegend`,lang)} :`}</span>
            <span className="SignData bold flex end">{nr?.to ? timeToDate(nr.to) : ''}</span>
          </div>
        }

      </div>
    }

    {
      printMode &&
      <div className="QRCodeArea flex">
        <QRCode value={url} size={QRsize} />
      </div>
    }

    </div>
  )
}