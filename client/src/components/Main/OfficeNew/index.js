import React, { useState } from "react"

import "./OfficeNew.scss"
import SiteIcon from "../../All/SiteIcon"


export default function OfficeNew(){

  const [companies, setCompanies] = useState( false ) 

  return(
    <div className="OfficeNew flex column">
    
    {
      !companies
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <React.Fragment>

      </React.Fragment>
    }

    </div>
  )
}