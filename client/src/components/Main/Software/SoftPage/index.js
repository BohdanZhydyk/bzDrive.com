import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import SiteIcon from '../../../All/SiteIcon'
import { getFileLinkAddr } from '../../../All/SoftwareCard/SoftwareReducer'
import { StoreSoftwareReducer } from '../StoreSoftwareReducer'
import SoftwareCard from '../../../All/SoftwareCard'


function SoftPage() {

  const { id } = useParams()

  const [soft, setSoft] = useState(false)
  const [save, setSave] = useState(false)

  const nr = soft?.nr
  const [car, setCar] = useState(false)

  let software = {}
  let s = 0

  soft?.soft && soft?.soft.forEach( (el, i)=> {
    if(el?.id === id){
      software = el
      s = i
    }
  })

  const {link, defaultFileAddr} = getFileLinkAddr(nr, software)

  const Reducer = (action)=> StoreSoftwareReducer({action, soft, setSoft, car, setCar})

  useEffect( ()=> { Reducer({type:"GET_CAR_CARD", id}) }, [id])

  // console.log("soft", soft)
  // console.log("car", car)

  return (
    <React.Fragment>
    {
      !soft
      ? <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      : <SoftwareCard props={{nr, car, setCar, software, s, setSoft, link, defaultFileAddr, save, setSave}} />
    }
    </React.Fragment>
  )
}

export default SoftPage
