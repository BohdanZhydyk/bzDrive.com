import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './Main.scss'
import SiteIcon from '../All/SiteIcon'
import Workshop from './Workshop'
import Software from './Software'
import News from './News'
import Apps from './Apps'
import Office from './Office'
import Cleaning from './Cleaning'
import Statistic from './Statistic'
import Profile from './Profile'
import Connect from './Connect'
import Document from './Document'
import SoftPage from './Software/SoftPage'


function Main({ props:{nav, blur, BLUR, size, AppReload} }) {

  const subNav = (link)=> nav?.filter( (el)=> el.to === link )[0]

  return (
    <main className={`${blur ? `blur` : ``}`}>

    {
      !nav
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <Routes>
        <Route path="/"           exact element={<Workshop props={{sub:subNav("/"), nav, AppReload}}/>} />
        <Route path="/news"             element={<News props={{sub:subNav("/news")}}/>} />
        <Route path="/software/*"       element={<Software props={{sub:subNav("/software")}}/>} />
        <Route path="/apps/*"           element={<Apps props={{sub:subNav("/apps")}}/>} />
        <Route path="/office/*"         element={<Office props={{size, sub:subNav("/office")}}/>} />
        <Route path="/cleaning/*"       element={<Cleaning props={{size, sub:subNav("/cleaning")}}/>} />
        <Route path="/statistic"        element={<Statistic props={{sub:subNav("/statistic")}}/>} />
        <Route path="/profile"          element={<Profile props={{sub:subNav("/profile")}}/>} />
        <Route path="/connect"          element={<Connect props={{sub:subNav("/connect")}}/>} />
        <Route path="/document/*"       element={<Document />} />
        <Route path="/softpage/:id"     element={<SoftPage />} />
      </Routes>
    }

    </main>
  )
}

export default Main