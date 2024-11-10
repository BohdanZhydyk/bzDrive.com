import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import SiteIcon from '../../../All/SiteIcon'
import { getFileLinkAddr } from '../../../All/SoftwareCard/SoftwareReducer'
import { SoftwareReducer } from '../SoftwareReducer'
import SoftwareCard from '../../../All/SoftwareCard'


function SoftPage() {

  const { id } = useParams()

  const [save, setSave] = useState(false)
  
  const [soft, setSoft] = useState(false)
  const [car, setCar] = useState(false)
  const [doc, setDoc] = useState(false)

  const [isLine, setIsLine] = useState(false)

  const Reducer = (action)=> SoftwareReducer({action, soft, setSoft, car, setCar, doc, setDoc})

  useEffect( ()=> { Reducer({type:"GET_CAR_CARD", id}) }, [id])

  // console.log("soft", soft)
  // console.log("car", car)

  return (
    <React.Fragment>
    {
      !soft
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <>
      {
        soft?.map( (sw, s)=>{

          const key = `SoftwareID-${sw?.id}`
          const docID = doc?._id
          const {link, defaultFileAddr} = getFileLinkAddr(doc, sw?.id)
          const props = {car, setCar, setSoft, sw, s, setSave, link, defaultFileAddr, isLine, setIsLine, docID}

          return <SoftwareCard props={props} key={key}/>
          
        })
      }
      </>
    }
    </React.Fragment>
  )
}

export default SoftPage
