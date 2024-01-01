import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './Main.scss'
import SiteIcon from '../All/SiteIcon'
import Workshop from './Workshop'
import Store from './Store'
import News from './News'
import Apps from './Apps'
import Office from './Office'
import Statistic from './Statistic'
import Profile from './Profile'
import Document from './Document'
import Connect from './Connect'


function Main({ props:{nav, blur, BLUR, size} }) {

  const subNav = (link)=> nav?.filter( (el)=> el.to === link )[0]

  return (
    <main className={`${blur ? `blur` : ``}`}>

    {
      !nav
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <Routes>
        <Route path="/"           exact element={<Workshop props={{sub:subNav("/")}}/>} />
        <Route path="/store/*"          element={<Store props={{sub:subNav("/store")}}/>} />
        <Route path="/news"             element={<News props={{sub:subNav("/news")}}/>} />
        <Route path="/apps/*"           element={<Apps props={{sub:subNav("/apps")}}/>} />
        <Route path="/office/*"         element={<Office props={{size, sub:subNav("/office")}}/>} />
        <Route path="/statistic"        element={<Statistic props={{sub:subNav("/statistic")}}/>} />
        <Route path="/profile"          element={<Profile props={{sub:subNav("/profile")}}/>} />
        <Route path="/connect"          element={<Connect props={{sub:subNav("/connect")}}/>} />
        <Route path="/document/*"       element={<Document />} />
      </Routes>
    }

    </main>
  )
}

export default Main