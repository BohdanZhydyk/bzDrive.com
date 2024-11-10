import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'

import { AppReducer } from './AppReducer'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import { useResizeDetector } from 'react-resize-detector'
import { GetUser } from './AppFunctions'

function App() {

  const user = GetUser()

  const [state, setState] = useState(false)

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

      </BrowserRouter>

    </div>
  )
}

export default App