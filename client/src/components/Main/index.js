import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './Main.scss'
import SiteIcon from '../All/SiteIcon'
import Workshop from './Workshop'
import News from './News'
import Apps from './Apps'
// import { FI } from './Office/FI'
import { ZL } from './Office/ZL'
// import { FS } from './Office/FS'
// import { FZ } from './Office/FZ'
// import { SP } from './Office/SP'
// import { KL } from './Office/KL'
// import { TO } from './Office/TO'
import Statistic from './Statistic'
import Profile from './Profile'


function Main({ props:{nav, blur, BLUR} }) {

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
        <Route path="/news"             element={<News props={{sub:subNav("/news")}}/>} />
        <Route path="/apps"             element={<Apps props={{sub:subNav("/apps")}}/>} />
        {/* <Route path="/office/fi"        element={<FI props={{}}/>} /> */}
        <Route path="/office/zl"        element={<ZL props={{}}/>} />
        {/* <Route path="/office/fs"        element={<FS props={{}}/>} />
        <Route path="/office/fz"        element={<FZ props={{}}/>} />
        <Route path="/office/sp"        element={<SP props={{}}/>} />
        <Route path="/office/kl"        element={<KL props={{}}/>} />
        <Route path="/office/to"        element={<TO props={{}}/>} /> */}
        <Route path="/statistic"        element={<Statistic props={{sub:subNav("/statistic")}}/>} />
        <Route path="/profile"          element={<Profile props={{sub:subNav("/profile")}}/>} />

      </Routes>
    }

    </main>
  )
}

export default Main