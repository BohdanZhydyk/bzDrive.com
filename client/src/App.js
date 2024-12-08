import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'

import { AppReducer } from './AppReducer'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import { useResizeDetector } from 'react-resize-detector'
import { GetCookie, GetUser, SetCookie } from './AppFunctions'
import CookiesPannel from './components/All/CookiesPannel'

function App() {

  const user = GetUser()
  const isLogined = user?.login

  const coockieStatus = GetCookie()

  function CLOSE_COOCKIES_PANNEL(){
    setIsCookiesPannel(false)
    SetCookie()
  }

  const [state, setState] = useState(false)

  const [isCookiesPannel, setIsCookiesPannel] = useState(true)

  const [blur, setBlur] = useState(false)
  const BLUR = (pannelMode)=> setBlur(prev=> prev ? false : pannelMode)

  const AppReload = ()=>{
    setState(false)
    setBlur(false)
    AppReducer( { type:"GET_STATE" }, state, setState )
  }

  useEffect( ()=>{ !state && AppReducer( { type:"GET_STATE" }, state, setState ) }, [])

  useEffect( ()=>{ user?.reload && AppReload() }, [user])

  const { width, height, ref } = useResizeDetector()

  let size = ()=>{
    let device = "ESD"
    if( width >= 481 ){ device = "SD" }
    if( width >= 768 ){ device = "MD" }
    if( width >= 1024 ){ device = "LD" }
    if( width > 1200 ){ device = "ELD" }
    let orientation = (width > height) ? "landscape" : "portrait"
    return({width, height, device, orientation})
  }

  // console.log("state", state)

  return (
    <div className="App" ref={ref}>
      
      <BrowserRouter>

        <Header props={{state, blur, BLUR, AppReload}}/>

        <Main props={{nav:state.nav, blur, BLUR, size, AppReload}}/>

        <Footer props={{state, blur, BLUR}}/>

        { !blur && state && isCookiesPannel && !coockieStatus && !isLogined && <CookiesPannel props={{CLOSE_COOCKIES_PANNEL}} /> }

      </BrowserRouter>

    </div>
  )
}

export default App