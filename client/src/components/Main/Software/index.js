import React, { useEffect, useState } from "react"

import "./Software.scss"
import { GetUser } from "../../../AppFunctions"
import { StoreSoftwareReducer } from "./StoreSoftwareReducer"
import BrandsWrapper from "./BrandsWrapper"
import { LastSoftware } from "./LastSoftware"


function Software() {

  const user = GetUser()
  const lang = user?.lang
  const isAdmin = user?.role === "admin"

  const [initialState, setInitialState] = useState([])

  const [software, setSoftware] = useState(false)

  const isSoftware = ( (initialState?.length > 0) && software )

  const carTop = {
    id: "top",
    model: "model",
    ECUType: "ECUType",
    swVersion: "swVersion",
    hwVersion: "hwVersion",
    programmer: "programmer",
    mod: "mod",
    readMethod: "method",
    swType: "swType"
  }

  const Reducer = (action)=> StoreSoftwareReducer({action, initialState, setInitialState, setSoftware})

  useEffect( ()=> { Reducer({type:"GET_CAR_CARDS"}) }, [])

  // console.log("initialState",initialState)
  // console.log("software",software)

  return (
    <div className="Software flex wrap">

      <BrandsWrapper props={{isSoftware, software, isAdmin, carTop, Reducer}}/>

      {/* <LastSoftware props={{initialState, carTop}} /> */}

    </div>
  )
}

export default Software