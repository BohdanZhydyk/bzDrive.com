import React from "react"

import { tr } from "../../../../AppTranslate"
import ActionBtn from "../../../All/ActionBtn"


export function CompaniesList({ props:{user, activeCompany, companies, setCompanies} }) {

  const CHK_COMPANY = (i)=> setCompanies( prev=> ({...prev, activeCompany:i}) )

  return(
    <div className="CompaniesList flex column start">

      {
        companies && companies?.companiesData.map( (com, i)=>{

          const key = `Company${i}`
          const classes = `CompanyLine ${ i === 0 ? `CompanyLineOrg` : ``} flex start between`
          const CompanyImg = `https://bzdrive.com/files/dealers/${com.img}`

          return(
            <div className={classes} onClick={ ()=>CHK_COMPANY(i) } key={key}>

              {
                com?.img
                ? <img className="ImgBtn" src={CompanyImg} alt="CompImg" />
                : <div className="ImgBtn"></div>
              }

              <div className="CompanyName flex start">
                {`${com?.shortName ?? tr(`AddNewCompanyBtn`,user.lang)}`}
              </div>

              <ActionBtn props={{name:(i === activeCompany) ? `check` : `empty`}} />
              
            </div>
          )
        })
      }

      {
        !user?.login &&
        <div className="NoLoginedUserWarning">
          <p>{`Uwaga!`}</p>
          <p>{`Nie jesteś zalogowany, więc wszystkie wprowadzone przez Ciebie dane będą widoczne do momentu ponownego uruchomienia aplikacji.`}</p>
          <p>{`Zachęcamy do wprowadzenia jedynie przykładowych danych Twojej firmy w celu przetestowania funkcjonalności https://bzdrive.com/office.`}</p>
        </div>
      }

    </div>
  )
}