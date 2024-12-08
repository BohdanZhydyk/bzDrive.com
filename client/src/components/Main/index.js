import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './Main.scss'
import SiteIcon from '../All/SiteIcon'
import Workshop from './Workshop'
import Software from './Software'
import OfficeNew from './OfficeNew'
import Office from './Office'
import Apps from './Apps'
import Profile from './Profile'
import Document from './Document'
import Cookies from './Cookies'
import SoftPage from './Software/SoftPage'
import Page404 from './Page404'


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
        <Route path="/software/*"       element={<Software props={{sub:subNav("/software")}}/>} />
        <Route path="/officenew/*"      element={<OfficeNew props={{size, sub:subNav("/bzoffice")}}/>} />
        <Route path="/office/*"         element={<Office props={{size, sub:subNav("/office")}}/>} />
        <Route path="/apps/*"           element={<Apps props={{sub:subNav("/apps")}}/>} />
        <Route path="/profile"          element={<Profile props={{sub:subNav("/profile")}}/>} />

        <Route path="/document/*"       element={<Document />} />
        <Route path="/cookies"          element={<Cookies />} />
        <Route path="/softpage/:id"     element={<SoftPage />} />

        <Route path="/*"                element={<Page404 />} />

      </Routes>
    }

    </main>
  )
}

export default Main