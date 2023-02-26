import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'

import { AppReducer } from './AppReducer'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {

  const [state, setState] = useState(false)

  const [blur, setBlur] = useState(false)
  const BLUR = ()=> setBlur(!blur)

  const AppReload = ()=>{
    setState(false)
    setBlur(false)
    AppReducer( { type:"GET_STATE" }, state, setState )
  }

  useEffect( ()=>{ !state && AppReducer( { type:"GET_STATE" }, state, setState ) }, [])

  // console.log("state", state)

  return (
    <div className="App">
      
      <BrowserRouter>

        <Header props={{state, blur, BLUR, AppReload}}/>

        <Main props={{nav:state.nav, blur, BLUR}}/>

        <Footer props={{state, blur, BLUR}}/>

      </BrowserRouter>

    </div>
  )
}

export default App
