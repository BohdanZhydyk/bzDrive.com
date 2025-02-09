import React from "react"
import QRCode from 'react-qr-code'

import { placeProps, fromProps, toProps } from "./propses"
import InputText from "../../../../All/InputText"
import InputDate from "../../../../All/InputDate"


export function DocSign({ props:{tr, lang, mode, nr, setNr, setSave, printMode} }) {

  const timeToDate = (time)=>{
    const str = time.toString()
    const year = str.slice(0,4)
    const month = str.slice(4,6)
    const day = str.slice(6,8)
    return `${day}.${month}.${year}`
  }

  const url = `https://bzdrive.com${window.location.pathname}`

  return(
    <div className="DocSign flex end">

    {
      !printMode
      ?
      <>
  
        <InputText props={ placeProps({tr, lang, nr, setNr, setSave}) } />
  
        <InputDate props={ fromProps({tr, lang, nr, setNr, setSave}) } />
        
        { ["ZL"].includes(mode) && <InputDate props={ toProps({tr, lang, nr, setNr, setSave}) } /> }

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
        <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={url}
        viewBox={`0 0 256 256`}
        />
      </div>
    }

    </div>
  )
}