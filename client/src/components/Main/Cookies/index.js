import React, { useState, useEffect } from 'react'

import './Cookies.scss'
import SiteIcon from '../../All/SiteIcon'
import { GetUser, PostToApi } from '../../../AppFunctions'
import { Title } from './CookiesTags/Title'
import { Paragraph } from './CookiesTags/Paragraph'
import { Actualization } from './CookiesTags/Actualization'
import { Theme } from './CookiesTags/Theme'
import { Company } from './CookiesTags/Company'
import { UlLi } from './CookiesTags/UlLi'
import { Email } from './CookiesTags/Email'
import { Link } from './CookiesTags/Link'


const Cookies = ()=>{

  const user = GetUser()
  const lang = user.lang

  const [cookies, setCookies] = useState(false)
  const [company, setCompany] = useState(false)
  
  useEffect( ()=>{ !cookies && !company && PostToApi("/getCookies", {}, (data)=>{
    setCookies( prev=> data?.cookies?.state )
    setCompany( prev=> data?.company )
  }) },[])

  return(
    <div className="Cookies flex column start">

      <div className="Pattern flex"></div>

      {
        !cookies
        ?
        <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
        :
        <>
        {
          company && cookies.map( (el, i)=>{
            const txt = el?.txt
            const li = el?.li
            const link = el?.link
            const key = `CookiesTag${el?.tag}${i}`
            switch (el?.tag) {
              case "title":       return <Title props={{txt, lang}} key={key} />
              case "actual":      return <Actualization props={{txt, lang}} key={key} />
              case "paragraph":   return <Paragraph props={{txt, lang}} key={key} />
              case "theme":       return <Theme props={{txt, lang}} key={key} />
              case "ul":          return <UlLi props={{txt, li, lang}} key={key} />
              case "link":        return <Link props={{txt, link, lang}} key={key} />
              case "company":     return <Company props={{txt:company, lang}} key={key} />
              case "email":       return <Email props={{txt:company, lang}} key={key} />
              default:            return <></>
            }
          })
        }
        </>
      }

    </div>
  )
}

export default Cookies